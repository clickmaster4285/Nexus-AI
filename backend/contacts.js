// ─────────────────────────────────────────────────────────────────────────────
// routes/contacts.js
// BASE PATH: /api/contacts  (set in server.js)
// ─────────────────────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router();
const {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = require('./contactController');

// GET    /api/contacts       → List/search contacts
router.get('/',    getContacts);

// POST   /api/contacts       → Create a contact
router.post('/',   createContact);

// GET    /api/contacts/:id   → Get one contact + their call history
router.get('/:id', getContactById);

// PUT    /api/contacts/:id   → Update a contact
router.put('/:id', updateContact);

// DELETE /api/contacts/:id   → Delete a contact
router.delete('/:id', deleteContact);

module.exports = router;
