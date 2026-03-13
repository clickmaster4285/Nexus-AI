// ─────────────────────────────────────────────────────────────────────────────
// services/asteriskService.js
//
// PURPOSE:
//   This is the HEART of the integration. It:
//     1. Opens a persistent TCP connection to Asterisk's AMI (port 5038)
//     2. Listens for real-time call events (incoming, answered, hung up, etc.)
//     3. Provides functions to SEND commands back to Asterisk (e.g. Click-to-Call)
//
// HOW AMI WORKS:
//   AMI (Asterisk Manager Interface) is a plain-text TCP protocol.
//   - Asterisk sends EVENTS  → e.g. "a new call just came in on extension 101"
//   - We send   ACTIONS  → e.g. "please originate a call from ext 101 to 0300..."
//   The `asterisk-manager` npm package wraps this protocol into Node.js events.
//
// EVENTS WE CARE ABOUT:
//   ┌─────────────────────┬──────────────────────────────────────────────────┐
//   │ Event               │ Meaning                                          │
//   ├─────────────────────┼──────────────────────────────────────────────────┤
//   │ Newchannel          │ A new call channel opened (ringing started)      │
//   │ Hangup              │ A call ended (we log it here)                    │
//   │ VarSet              │ A channel variable was set (used for recordings) │
//   │ AgentCalled         │ A queue agent is being rung                      │
//   └─────────────────────┴──────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

const AsteriskManager = require('asterisk-manager');
const CallLog         = require('./CallLog');
const Contact         = require('./Contact');

// We store the Socket.io instance here so we can push events to browsers
let _io = null;

// The AMI connection instance (created once, reused everywhere)
let ami = null;

// ─────────────────────────────────────────────
// init(io)
//
// Call this once at startup (from server.js).
// io = the Socket.io server instance, used to push
//      real-time popups to connected browsers.
// ─────────────────────────────────────────────
const init = (io) => {
  _io = io;

  // Create the AMI connection using credentials from .env
  ami = new AsteriskManager(
    parseInt(process.env.AMI_PORT) || 5038,
    process.env.AMI_HOST,
    process.env.AMI_USERNAME,
    process.env.AMI_PASSWORD,
    true  // true = subscribe to ALL events from Asterisk
  );

  // keepConnected() tells the library to auto-reconnect if the TCP link drops.
  // Without this, a network blip would silently kill your integration.
  ami.keepConnected();

  // ── Connection lifecycle events ──────────────────────────────────────────

  ami.on('connect', () => {
    console.log('✅ Asterisk AMI connected');
  });

  ami.on('error', (err) => {
    console.error('❌ AMI Error:', err.message);
  });

  ami.on('disconnect', () => {
    console.warn('⚠️  AMI disconnected — will auto-reconnect...');
  });

  // ── Call Event Listeners ─────────────────────────────────────────────────

  ami.on('managerevent', handleAMIEvent);

  console.log('🔌 Asterisk AMI service initializing...');
};

// ─────────────────────────────────────────────
// handleAMIEvent(event)
//
// Every single event from Asterisk flows through here.
// We filter by event.event (the event type name) and
// call the appropriate handler.
// ─────────────────────────────────────────────
const handleAMIEvent = async (event) => {
  switch (event.event) {

    // ── INCOMING CALL DETECTED ─────────────────────────────────────────────
    // Fired the moment a new call channel is created.
    // This is where we trigger the "popup" on the agent's screen.
    case 'Newchannel':
      await handleIncomingCall(event);
      break;

    // ── CALL ENDED ────────────────────────────────────────────────────────
    // Fired when any channel hangs up.
    // This is where we write the call log to the database.
    case 'Hangup':
      await handleHangup(event);
      break;

    // ── VARIABLE SET ON A CHANNEL ─────────────────────────────────────────
    // Asterisk sets MIXMONITOR_FILENAME when a recording starts.
    // We capture the file path so we can link it to the call log later.
    case 'VarSet':
      if (event.variable === 'MIXMONITOR_FILENAME') {
        await handleRecordingStarted(event);
      }
      break;

    // Ignore all other events silently
    default:
      break;
  }
};

// ─────────────────────────────────────────────
// handleIncomingCall(event)
//
// What happens:
//   1. Extract the caller's phone number from the event
//   2. Look up that number in your CRM contacts database
//   3. Emit a Socket.io event to ALL connected browsers
//      (the frontend listens for this and shows a popup)
// ─────────────────────────────────────────────
const handleIncomingCall = async (event) => {
  try {
    // event.calleridnum = the phone number that is calling (e.g. "03001234567")
    // event.exten       = the extension being dialled (e.g. "101")
    // event.uniqueid    = a unique ID for this call (e.g. "1701234567.42")
    const callerNumber = event.calleridnum;
    const dialledExt   = event.exten;
    const uniqueId     = event.uniqueid;

    // Only process calls that have a real caller ID (skip internal system events)
    if (!callerNumber || callerNumber === '<unknown>') return;

    // ── Look up the caller in your CRM ──────────────────────────────────
    // This matches any contact whose `phones` array contains this number.
    const contact = await Contact.findOne({ phones: callerNumber });

    // ── Push real-time popup to ALL browser agents via Socket.io ────────
    // On the frontend, you listen with: socket.on('incoming-call', ...)
    _io.emit('incoming-call', {
      uniqueId,
      callerNumber,
      dialledExt,
      contact: contact
        ? {
            id:      contact._id,
            name:    contact.name,
            email:   contact.email,
            company: contact.company,
          }
        : null, // null = unknown caller
      timestamp: new Date().toISOString(),
    });

    console.log(`📞 Incoming call from ${callerNumber} → ext ${dialledExt}`);
  } catch (err) {
    console.error('handleIncomingCall error:', err.message);
  }
};

// ─────────────────────────────────────────────
// handleHangup(event)
//
// What happens:
//   1. A call ended — we get duration, cause, and IDs
//   2. We save a CallLog record to MongoDB
//   3. We emit a socket event so the frontend can close the popup
//
// IMPORTANT: Asterisk fires Hangup for EVERY channel (each leg of a call),
// so a single call may produce 2 Hangup events. We use uniqueid to deduplicate.
// ─────────────────────────────────────────────
const handleHangup = async (event) => {
  try {
    const {
      calleridnum,   // Caller's number
      exten,         // Dialled extension
      uniqueid,      // Unique call ID
      duration,      // Duration in seconds (only set on some Asterisk versions)
      cause,         // Hangup cause code (0=Normal, 16=Normal, 17=Busy, etc.)
      'cause-txt': causeText, // Human-readable cause (e.g. "Normal Clearing")
    } = event;

    if (!calleridnum || calleridnum === '<unknown>') return;

    // Prevent duplicate logs for the same call (both legs fire Hangup)
    const existing = await CallLog.findOne({ uniqueId: uniqueid });
    if (existing) return;

    // Determine disposition from the hangup cause code
    // 16 = Normal call clearing (ANSWERED), 17 = Busy, 19 = No Answer
    const disposition = getDisposition(parseInt(cause));

    // ── Save to MongoDB ──────────────────────────────────────────────────
    const log = await CallLog.create({
      uniqueId:    uniqueid,
      callerNumber: calleridnum,
      dialledExt:  exten,
      duration:    parseInt(duration) || 0,
      disposition,
      causeCode:   parseInt(cause),
      causeText:   causeText || '',
      recordingPath: null, // Will be filled in by handleRecordingStarted
    });

    // Notify frontend that the call ended (so popup can be dismissed/updated)
    _io.emit('call-ended', {
      uniqueId:    uniqueid,
      callLogId:   log._id,
      disposition,
      duration:    log.duration,
    });

    console.log(`📵 Call ended: ${calleridnum} (${disposition}, ${log.duration}s)`);
  } catch (err) {
    console.error('handleHangup error:', err.message);
  }
};

// ─────────────────────────────────────────────
// handleRecordingStarted(event)
//
// When call recording is enabled in FreePBX (via MixMonitor),
// Asterisk sets a channel variable MIXMONITOR_FILENAME with the
// full path to the recording file (e.g. /var/spool/asterisk/monitor/xyz.wav)
//
// We find the matching CallLog by uniqueid and attach the recording path.
// ─────────────────────────────────────────────
const handleRecordingStarted = async (event) => {
  try {
    const { uniqueid, value: recordingPath } = event;

    if (!recordingPath) return;

    // Build a public URL so the CRM frontend can stream/download the recording
    // e.g. http://your-server:3000/recordings/xyz.wav
    const fileName   = recordingPath.split('/').pop();
    const publicUrl  = `${process.env.RECORDINGS_BASE_URL}/${fileName}`;

    // Update the CallLog with the recording path (may not exist yet if Hangup
    // hasn't fired — that's OK, Hangup will come shortly after)
    await CallLog.findOneAndUpdate(
      { uniqueId: uniqueid },
      { recordingPath: publicUrl },
      { upsert: false } // Don't create a new record, only update existing
    );

    console.log(`🎙️  Recording linked: ${fileName}`);
  } catch (err) {
    console.error('handleRecordingStarted error:', err.message);
  }
};

// ─────────────────────────────────────────────
// originateCall(agentExtension, customerNumber)
//
// This is the CLICK-TO-CALL function.
//
// How it works:
//   1. Asterisk first CALLS the agent's extension (their desk phone rings)
//   2. Agent picks up
//   3. Asterisk then dials the customer and bridges the two legs together
//
// This is called "Originate" in Asterisk terminology.
// ─────────────────────────────────────────────
const originateCall = (agentExtension, customerNumber) => {
  return new Promise((resolve, reject) => {
    ami.action(
      {
        action:   'Originate',           // Tell AMI we want to make a call
        channel:  `SIP/${agentExtension}`, // Ring the agent first (SIP phone)
        exten:    customerNumber,          // Then dial this number
        context:  'from-internal',         // FreePBX dial context (check your setup)
        priority: 1,                       // Always 1 for outbound
        callerid: `CRM <${agentExtension}>`, // What the agent sees on their phone
        timeout:  30000,                   // Wait 30s for agent to answer (ms)
        async:    true,                    // Don't block — fire and continue
      },
      (err, response) => {
        if (err) {
          console.error('Originate failed:', err);
          return reject(err);
        }
        console.log(`📲 Click-to-Call: ext ${agentExtension} → ${customerNumber}`);
        resolve(response);
      }
    );
  });
};

// ─────────────────────────────────────────────
// getDisposition(causeCode)
//
// Translates Asterisk's numeric hangup cause codes into
// human-readable strings for your CRM.
//
// Full list: https://www.voip-info.org/asterisk-variable-hangupcause/
// ─────────────────────────────────────────────
const getDisposition = (causeCode) => {
  const map = {
    16: 'ANSWERED',   // Normal call clearing
    17: 'BUSY',       // User busy
    18: 'NO_ANSWER',  // No user responding
    19: 'NO_ANSWER',  // No answer from user
    21: 'REJECTED',   // Call rejected
    0:  'UNKNOWN',
  };
  return map[causeCode] || 'UNKNOWN';
};

// Export init and originateCall for use in server.js and route controllers
module.exports = { init, originateCall };
