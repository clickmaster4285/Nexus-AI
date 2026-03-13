// ─────────────────────────────────────────────────────────────────────────────
// controllers/callController.js
//
// PURPOSE:
//   Controllers contain the LOGIC for each API route.
//   A route file just maps URLs → controller functions.
//   Keeping logic here (not in routes) keeps code organized and testable.
//
// FUNCTIONS IN THIS FILE:
//   getCallLogs      — GET  /api/calls         → List all call logs (paginated)
//   getCallById      — GET  /api/calls/:id      → Get one call log by ID
//   updateCallNotes  — PUT  /api/calls/:id/notes → Agent adds notes to a call
//   clickToCall      — POST /api/calls/originate → Trigger outbound call
//   getCallStats     — GET  /api/calls/stats    → Summary stats for dashboard
// ─────────────────────────────────────────────────────────────────────────────

const CallLog         = require('./CallLog');
const { originateCall } = require('./asteriskService');

// ─────────────────────────────────────────────
// GET /api/calls
//
// Returns paginated call logs, newest first.
// Supports query filters:
//   ?disposition=ANSWERED
//   ?callerNumber=03001234567
//   ?from=2024-01-01&to=2024-01-31
//   ?page=2&limit=20
// ─────────────────────────────────────────────
const getCallLogs = async (req, res) => {
  try {
    // Destructure query params with defaults
    const {
      page        = 1,
      limit       = 20,
      disposition,
      callerNumber,
      from,
      to,
    } = req.query;

    // Build a MongoDB filter object dynamically
    // Only add a condition if the query param was actually provided
    const filter = {};

    if (disposition)   filter.disposition   = disposition;
    if (callerNumber)  filter.callerNumber   = callerNumber;

    // Date range filter on createdAt
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);  // $gte = greater than or equal
      if (to)   filter.createdAt.$lte = new Date(to);    // $lte = less than or equal
    }

    // .skip() and .limit() implement pagination:
    //   page 1 = skip 0,  show records 1–20
    //   page 2 = skip 20, show records 21–40
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await CallLog.countDocuments(filter);

    const logs = await CallLog
      .find(filter)
      .sort({ createdAt: -1 })           // Newest first
      .skip(skip)
      .limit(parseInt(limit))
      .populate('contactId', 'name email company'); // Join contact details inline

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page:       parseInt(page),
        limit:      parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/calls/:id
//
// Returns a single call log by MongoDB _id.
// .populate() replaces the contactId ObjectId with the actual contact document.
// ─────────────────────────────────────────────
const getCallById = async (req, res) => {
  try {
    const log = await CallLog
      .findById(req.params.id)
      .populate('contactId', 'name email company phones');

    if (!log) {
      return res.status(404).json({ success: false, message: 'Call log not found' });
    }

    res.json({ success: true, data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/calls/:id/notes
//
// Lets an agent add notes to a call after it ends.
// e.g. "Customer asked about invoice #1234, will follow up Monday"
//
// Body: { notes: "..." }
// ─────────────────────────────────────────────
const updateCallNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ success: false, message: 'Notes field is required' });
    }

    const log = await CallLog.findByIdAndUpdate(
      req.params.id,
      { notes },
      { new: true } // Return the UPDATED document (not the old one)
    );

    if (!log) {
      return res.status(404).json({ success: false, message: 'Call log not found' });
    }

    res.json({ success: true, data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// POST /api/calls/originate  (Click-to-Call)
//
// Triggers an outbound call from the CRM.
// Body: { agentExtension: "101", customerNumber: "03001234567" }
//
// Flow:
//   1. Validate input
//   2. Call asteriskService.originateCall()
//   3. Asterisk rings the agent's phone
//   4. Agent picks up → Asterisk then dials the customer
// ─────────────────────────────────────────────
const clickToCall = async (req, res) => {
  try {
    const { agentExtension, customerNumber } = req.body;

    // ── Input validation ────────────────────────────────────────────────
    if (!agentExtension || !customerNumber) {
      return res.status(400).json({
        success: false,
        message: 'agentExtension and customerNumber are required',
      });
    }

    // Sanitize: remove spaces, dashes, etc. from the number
    const cleanNumber = customerNumber.replace(/[\s\-\(\)]/g, '');

    // ── Fire the call via AMI ────────────────────────────────────────────
    await originateCall(agentExtension, cleanNumber);

    res.json({
      success: true,
      message: `Calling ext ${agentExtension} first, then bridging to ${cleanNumber}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/calls/stats
//
// Returns dashboard-ready summary statistics.
// Example response:
// {
//   total: 120,
//   answered: 95,
//   missed: 15,
//   busy: 10,
//   avgDuration: 187,    ← seconds
//   today: 23
// }
//
// Uses MongoDB's aggregation pipeline — a series of data
// transformation stages, similar to SQL GROUP BY + COUNT.
// ─────────────────────────────────────────────
const getCallStats = async (req, res) => {
  try {
    // Aggregation pipeline:
    // Stage 1 ($group): Group ALL documents together (_id: null),
    //                   then calculate counts and sums.
    // $sum: 1          — count each document (+1 per doc)
    // $sum with $cond  — conditional count (like COUNT WHERE disposition='X')
    // $avg             — average of a field
    const stats = await CallLog.aggregate([
      {
        $group: {
          _id:      null, // null = group everything together (no sub-grouping)
          total:    { $sum: 1 },
          answered: { $sum: { $cond: [{ $eq: ['$disposition', 'ANSWERED'] }, 1, 0] } },
          missed:   { $sum: { $cond: [{ $eq: ['$disposition', 'NO_ANSWER'] }, 1, 0] } },
          busy:     { $sum: { $cond: [{ $eq: ['$disposition', 'BUSY'] }, 1, 0] } },
          avgDuration: { $avg: '$duration' },
        },
      },
      {
        // $project = select which fields to include in the output
        // _id: 0 = exclude the _id field (we don't need it)
        $project: {
          _id:         0,
          total:       1,
          answered:    1,
          missed:      1,
          busy:        1,
          avgDuration: { $round: ['$avgDuration', 0] }, // Round to whole seconds
        },
      },
    ]);

    // Count calls from today separately
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of today: 00:00:00

    const todayCount = await CallLog.countDocuments({
      createdAt: { $gte: todayStart },
    });

    res.json({
      success: true,
      data: {
        ...(stats[0] || { total: 0, answered: 0, missed: 0, busy: 0, avgDuration: 0 }),
        today: todayCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCallLogs,
  getCallById,
  updateCallNotes,
  clickToCall,
  getCallStats,
};
