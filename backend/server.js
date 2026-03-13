// ─────────────────────────────────────────────────────────────────────────────
// server.js  —  THE ENTRY POINT
//
// This is the file you run: `node server.js`
//
// It does the following in order:
//   1. Load environment variables from .env
//   2. Connect to MongoDB
//   3. Create an Express HTTP server
//   4. Attach Socket.io to the same server (for real-time browser events)
//   5. Register global middleware (CORS, JSON parsing, security headers, logging)
//   6. Register API routes
//   7. Serve the call recordings folder as static files
//   8. Initialize the Asterisk AMI service (starts listening to FreePBX)
//   9. Start listening for HTTP connections
// ─────────────────────────────────────────────────────────────────────────────

// ── Step 1: Load .env variables FIRST (before any other import uses them) ──
require('dotenv').config();

const express = require('express');
const http = require('http');       // Node's built-in HTTP module
const { Server } = require('socket.io'); // Real-time WebSocket library
const cors = require('cors');       // Cross-Origin Resource Sharing
const helmet = require('helmet');     // Sets secure HTTP headers
const morgan = require('morgan');     // HTTP request logger
const path = require('path');
const rateLimit = require('express-rate-limit');

const connectDB = require('./database');
const asteriskService = require('./asteriskService');
const callRoutes = require('./calls');
const contactRoutes = require('./contacts');
const errorHandler = require('./errorHandler');

// ── Step 2: Connect to MongoDB ───────────────────────────────────────────────
connectDB();

// ── Step 3: Create Express app ───────────────────────────────────────────────
// Express is a minimal web framework. It handles HTTP routing and middleware.
const app = express();

// ── Step 4: Create HTTP server and attach Socket.io ──────────────────────────
//
// WHY do we use http.createServer(app) instead of just app.listen()?
// Because Socket.io needs access to the RAW http.Server object to upgrade
// HTTP connections to WebSocket connections. If we used app.listen() alone,
// Socket.io couldn't attach to the same port.
//
const httpServer = http.createServer(app);

// Socket.io configuration:
// cors.origin — which frontend URLs are allowed to connect via WebSocket
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST'],
  },
});

// ── Socket.io connection handler ─────────────────────────────────────────────
// This runs every time a browser agent connects to the WebSocket server.
io.on('connection', (socket) => {
  console.log(`🟢 Agent connected via Socket.io — ID: ${socket.id}`);

  // When the agent disconnects (closes tab, logs out, etc.)
  socket.on('disconnect', () => {
    console.log(`🔴 Agent disconnected — ID: ${socket.id}`);
  });

  // Example: agent can join a "room" by their extension
  // This lets you emit to a SPECIFIC agent instead of all agents
  // Frontend: socket.emit('join-extension', '101')
  socket.on('join-extension', (extension) => {
    socket.join(`ext-${extension}`);
    console.log(`📡 Agent joined room: ext-${extension}`);
  });
});

// ── Step 5: Global Middleware ─────────────────────────────────────────────────

// helmet() adds security-focused HTTP response headers automatically.
// e.g. X-Content-Type-Options, X-Frame-Options, etc.
app.use(helmet());

// cors() allows your CRM frontend (running on a different port/domain) to
// make API requests to this server. Without this, browsers block cross-origin requests.
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
}));

// express.json() parses incoming JSON request bodies.
// Without this, req.body would be undefined for POST/PUT requests.
app.use(express.json());

// morgan('dev') logs every HTTP request in the console:
// e.g. "GET /api/calls 200 14.234 ms - 512"
// This is invaluable for debugging.
app.use(morgan('dev'));

// Rate limiting — prevent abuse of the API.
// Here we limit each IP to 100 requests per 15 minutes.
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: { success: false, message: 'Too many requests, slow down.' },
// });
// app.use('/api');

// ── Step 6: API Routes ───────────────────────────────────────────────────────
//
// app.use(path, router) mounts a router at a base path.
// So callRoutes handles everything at /api/calls/*
//    contactRoutes handles everything at /api/contacts/*
//
app.use('/api/calls', callRoutes);
app.use('/api/contacts', contactRoutes);

// ── Health check endpoint ────────────────────────────────────────────────────
// A simple GET /api/health route that returns 200 OK.
// Useful for monitoring tools and load balancers to check if server is alive.
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),  // Seconds since server started
    timestamp: new Date().toISOString(),
  });
});

// ── Step 7: Serve Call Recordings ────────────────────────────────────────────
//
// express.static() serves files from a folder over HTTP.
// So a recording at /var/spool/asterisk/monitor/call123.wav becomes
// accessible at http://your-server:3000/recordings/call123.wav
//
// ⚠️  SECURITY NOTE: In production, add authentication middleware BEFORE
//     this line to protect recordings from unauthorized access.
//
app.use(
  '/recordings',
  express.static(process.env.RECORDINGS_PATH || '/var/spool/asterisk/monitor')
);

// ── Step 8: Initialize Asterisk AMI Service ──────────────────────────────────
//
// We pass `io` (Socket.io server) so the AMI service can push real-time
// events (incoming calls, call ended) to connected browser agents.
//
asteriskService.init(io);

// ── Step 9: Global Error Handler (must be last middleware) ───────────────────
app.use(errorHandler);

// ── Start the HTTP Server ────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log(`🚀  PBX-CRM Backend running on port ${PORT}`);
  console.log(`📡  Socket.io ready for agent connections`);
  console.log(`🔗  API Base: http://localhost:${PORT}/api`);
  console.log('═══════════════════════════════════════════');
  console.log('');
});
