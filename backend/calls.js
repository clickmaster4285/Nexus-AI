// ─────────────────────────────────────────────────────────────────────────────
// routes/calls.js
//
// PURPOSE:
//   Maps HTTP methods + URL paths → controller functions.
//   Think of this as the "menu" — it lists what URLs your API accepts.
//   The actual logic lives in the controller.
//
// BASE PATH: /api/calls  (set in server.js)
// ─────────────────────────────────────────────────────────────────────────────

const express    = require('express');
const router     = express.Router();
const {
  getCallLogs,
  getCallById,
  updateCallNotes,
  clickToCall,
  getCallStats,
} = require('./callController');

// GET  /api/calls/stats      → Dashboard stats (must be BEFORE /:id to avoid conflict)
router.get('/stats', getCallStats);

// GET  /api/calls            → Paginated call log list
router.get('/', getCallLogs);

// GET  /api/calls/:id        → Single call log
router.get('/:id', getCallById);

// PUT  /api/calls/:id/notes  → Add/update agent notes on a call
router.put('/:id/notes', updateCallNotes);

// POST /api/calls/originate  → Click-to-call (trigger outbound call)
router.post('/originate', clickToCall);

module.exports = router;
