// ─────────────────────────────────────────────────────────────────────────────
// config/database.js
//
// PURPOSE:
//   Connects your Node.js app to MongoDB using Mongoose.
//   Mongoose is an ODM (Object Data Modeling) library — it lets you define
//   "schemas" (data shapes) and query MongoDB in a clean, structured way.
//
// WHY MONGODB?
//   Call logs, contacts, and events are semi-structured data — MongoDB handles
//   this flexibly without needing rigid SQL table schemas.
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // mongoose.connect() opens a persistent connection to MongoDB.
    // (Options such as useNewUrlParser and useUnifiedTopology are now defaults in
    // Mongoose 7 and should be omitted.)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If MongoDB is unreachable, log the error and exit the process.
    // We exit because the app cannot work without a database.
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit code 1 = failure
  }
};

module.exports = connectDB;
