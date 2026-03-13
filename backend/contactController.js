// ─────────────────────────────────────────────────────────────────────────────
// controllers/contactController.js
//
// PURPOSE:
//   Manages CRM contacts — the people your agents call and receive calls from.
//   When a call comes in, we search contacts by phone number to identify callers.
//
// ROUTES HANDLED:
//   GET    /api/contacts          → List/search all contacts
//   POST   /api/contacts          → Create a new contact
//   GET    /api/contacts/:id      → Get one contact + their call history
//   PUT    /api/contacts/:id      → Update a contact
//   DELETE /api/contacts/:id      → Delete a contact
// ─────────────────────────────────────────────────────────────────────────────

const Contact = require('./Contact');
const CallLog = require('./CallLog');

// ─────────────────────────────────────────────
// GET /api/contacts
//
// Supports:
//   ?search=john          → Full-text search on name/email/company
//   ?phone=03001234567    → Find by exact phone number
//   ?page=1&limit=20      → Pagination
// ─────────────────────────────────────────────
const getContacts = async (req, res) => {
  try {
    const { search, phone, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (search) {
      // $text search uses the text index we created in the schema
      filter.$text = { $search: search };
    }

    if (phone) {
      // Search the phones array for this number
      // MongoDB can query arrays just like scalar fields
      filter.phones = phone;
    }

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Contact.countDocuments(filter);

    const contacts = await Contact
      .find(filter)
      .sort({ name: 1 }) // Alphabetical
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: contacts,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// POST /api/contacts
//
// Creates a new CRM contact.
// Body: { name, email, company, phones: [...], tags: [...], notes }
// ─────────────────────────────────────────────
const createContact = async (req, res) => {
  try {
    const { name, email, company, phones, tags, notes } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const contact = await Contact.create({ name, email, company, phones, tags, notes });

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    // Handle duplicate key errors (e.g. duplicate email if you add a unique index)
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Contact already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/contacts/:id
//
// Returns a contact AND their full call history.
// This powers the "Contact Detail" page in your CRM.
// ─────────────────────────────────────────────
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Find all call logs where the caller's number matches any of this contact's phones
    // $in = "field value is IN this array"
    const callHistory = await CallLog
      .find({ callerNumber: { $in: contact.phones } })
      .sort({ createdAt: -1 })
      .limit(50); // Last 50 calls

    res.json({
      success: true,
      data: {
        contact,
        callHistory,
        totalCalls: callHistory.length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/contacts/:id
//
// Updates a contact's details.
// Only updates fields that are sent in the body (partial update).
// ─────────────────────────────────────────────
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:         true,  // Return updated doc
        runValidators: true, // Re-run schema validators on update
      }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/contacts/:id
// ─────────────────────────────────────────────
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getContacts, createContact, getContactById, updateContact, deleteContact };
