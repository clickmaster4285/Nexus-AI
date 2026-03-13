// ─────────────────────────────────────────────────────────────────────────────
// models/Contact.js
//
// PURPOSE:
//   Stores your CRM contacts. When an incoming call arrives,
//   we search this collection by phone number to identify the caller
//   and populate the popup with their details.
//
// KEY DESIGN DECISIONS:
//   phones: [String]  — An array of phone numbers.
//                       One contact can have multiple numbers (mobile, office, etc.)
//                       We index this field so lookups are fast even with
//                       thousands of contacts.
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: true,  // Every contact must have a name
      trim:     true,  // Auto-strip leading/trailing spaces
    },

    email: {
      type:      String,
      lowercase: true, // Store emails in lowercase for consistent lookups
      trim:      true,
    },

    company: {
      type: String,
      trim: true,
    },

    // Array of phone numbers — one contact can have multiple
    // e.g. ["03001234567", "+923001234567", "0512345678"]
    phones: {
      type:  [String],
      index: true,  // Index for fast lookup during incoming call matching
    },

    tags: {
      type: [String],  // e.g. ["VIP", "Lead", "Support"]
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ── Text Index for Search ─────────────────────────────────────────────────
// This creates a full-text search index on name, email, and company.
// Lets you search contacts with: Contact.find({ $text: { $search: "John" } })
contactSchema.index({ name: 'text', email: 'text', company: 'text' });

module.exports = mongoose.model('Contact', contactSchema);
