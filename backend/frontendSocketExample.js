// ─────────────────────────────────────────────────────────────────────────────
// utils/frontendSocketExample.js
//
// PURPOSE:
//   This is NOT part of the backend — it's example code to paste into
//   your FRONTEND (React, Vue, plain HTML, etc.) to receive real-time
//   events from the backend via Socket.io.
//
// HOW TO USE:
//   1. Install socket.io-client in your frontend: npm install socket.io-client
//   2. Copy the relevant parts into your frontend code
// ─────────────────────────────────────────────────────────────────────────────

// ── In your frontend JavaScript ──────────────────────────────────────────────

import { io } from 'socket.io-client';

// Connect to your backend Socket.io server
const socket = io('http://your-backend-server:3000');

// ── Join your extension room ──────────────────────────────────────────────────
// This tells the server which extension this agent uses.
// The backend can then emit events ONLY to this agent (instead of all agents).
const myExtension = '101'; // Get this from your login session
socket.emit('join-extension', myExtension);

// ── Listen for incoming call popup ───────────────────────────────────────────
// This fires the moment a call arrives at FreePBX, BEFORE it's answered.
socket.on('incoming-call', (data) => {
  console.log('📞 Incoming call:', data);

  // data = {
  //   uniqueId:     "1701234567.42",
  //   callerNumber: "03001234567",
  //   dialledExt:   "101",
  //   contact: {                    ← null if caller is unknown
  //     id:      "mongo_object_id",
  //     name:    "Ahmed Khan",
  //     email:   "ahmed@company.com",
  //     company: "XYZ Corp",
  //   },
  //   timestamp: "2024-01-15T10:30:00Z"
  // }

  // ── Show a popup notification ────────────────────────────────────────────
  if (data.contact) {
    showPopup({
      title:    `📞 Incoming call from ${data.contact.name}`,
      subtitle: `${data.callerNumber} · ${data.contact.company}`,
      link:     `/contacts/${data.contact.id}`,  // Link to contact page in CRM
    });
  } else {
    showPopup({
      title:    `📞 Unknown caller: ${data.callerNumber}`,
      subtitle: 'Click to create a new contact',
      link:     `/contacts/new?phone=${data.callerNumber}`,
    });
  }
});

// ── Listen for call ended ─────────────────────────────────────────────────────
// Use this to dismiss the popup and optionally show call duration.
socket.on('call-ended', (data) => {
  console.log('📵 Call ended:', data);

  // data = {
  //   uniqueId:    "1701234567.42",
  //   callLogId:   "mongo_object_id",    ← Use this to link to the call log
  //   disposition: "ANSWERED",
  //   duration:    187                   ← seconds
  // }

  dismissPopup(data.uniqueId);
  // Optionally navigate agent to the call log to add notes:
  // router.push(`/calls/${data.callLogId}`)
});

// ── Click-to-Call from frontend ──────────────────────────────────────────────
// Call this when an agent clicks a "Call" button next to a contact.
const clickToCall = async (customerNumber) => {
  const response = await fetch('http://your-backend:3000/api/calls/originate', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      agentExtension: myExtension,  // Agent's SIP extension
      customerNumber,               // The number to dial
    }),
  });

  const result = await response.json();
  console.log(result.message); // "Calling ext 101 first, then bridging to 03001234567"
};
