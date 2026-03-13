// ─────────────────────────────────────────────────────────────────────────────
// middleware/errorHandler.js
//
// PURPOSE:
//   A "catch-all" error handler for Express.
//
// HOW EXPRESS MIDDLEWARE WORKS:
//   Express processes requests through a chain of middleware functions.
//   Each function gets (req, res, next). Calling next() passes to the next one.
//   An error handler has 4 parameters: (err, req, res, next).
//   Express knows it's an error handler because of the 4th parameter.
//
// This is registered LAST in server.js (after all routes), so any error
// thrown anywhere in the app bubbles up here.
// ─────────────────────────────────────────────────────────────────────────────

const errorHandler = (err, req, res, next) => {
  // Log the full stack trace to the server console for debugging
  console.error('🔴 Error:', err.stack);

  // Mongoose validation errors (e.g. missing required field)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  // Mongoose bad ObjectId (e.g. /api/calls/not-a-valid-id)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Default: 500 Internal Server Error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
