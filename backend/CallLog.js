// ─────────────────────────────────────────────────────────────────────────────
// models/CallLog.js
//
// PURPOSE:
//   Defines the shape (schema) of a call log record in MongoDB.
//
// WHAT IS A MONGOOSE SCHEMA?
//   Think of it like a blueprint. Every time a call ends, we create one
//   document (row) that follows this blueprint and save it to the
//   `calllogs` collection in MongoDB.
//
// EACH FIELD EXPLAINED:
//   uniqueId      — Asterisk's internal call ID (e.g. "1701234567.42").
//                   We use this to match AMI events to the same call.
//   callerNumber  — The number that called (e.g. "03001234567")
//   dialledExt    — The extension that was rung (e.g. "101")
//   duration      — How long the call lasted in SECONDS
//   disposition   — ANSWERED / BUSY / NO_ANSWER / REJECTED / UNKNOWN
//   recordingPath — URL to stream/download the .wav recording (if enabled)
//   contactId     — Optional: link to a Contact document (if caller was found)
//   agentExt      — The agent who handled the call
//   notes         — Agents can add notes after the call via the CRM UI
//   timestamps    — Mongoose auto-adds createdAt and updatedAt fields
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema(
  {
    uniqueId: {
      type:   String,
      unique: true,   // Prevents duplicate logs for the same call
      index:  true,   // Speeds up lookups when matching AMI events
    },

    callerNumber: {
      type:  String,
      index: true,    // We search by phone number frequently
    },

    dialledExt: {
      type: String,
    },

    direction: {
      type:    String,
      enum:    ['inbound', 'outbound'],
      default: 'inbound',
    },

    duration: {
      type:    Number,  // seconds
      default: 0,
    },

    disposition: {
      type:    String,
      enum:    ['ANSWERED', 'BUSY', 'NO_ANSWER', 'REJECTED', 'UNKNOWN'],
      default: 'UNKNOWN',
    },

    causeCode: {
      type: Number,   // Raw Asterisk hangup cause code
    },

    causeText: {
      type: String,   // Human-readable version of the cause code
    },

    recordingPath: {
      type:    String,
      default: null,  // null means no recording available
    },

    // Optional: link this call to a Contact in your CRM
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Contact',  // Allows .populate('contactId') in queries
    },

    agentExt: {
      type: String,
    },

    notes: {
      type:    String,
      default: '',
    },
  },
  {
    // timestamps: true tells Mongoose to automatically manage:
    //   createdAt — when this record was first inserted
    //   updatedAt — when this record was last modified
    timestamps: true,
  }
);

module.exports = mongoose.model('CallLog', callLogSchema);
