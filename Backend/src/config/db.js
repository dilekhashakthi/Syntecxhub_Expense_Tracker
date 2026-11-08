const mongoose = require("mongoose");

async function DBConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful...");
  } catch (error) {
    console.error("Database connection failed:", error.message || error);
    process.exit(1);
  }
}

module.exports = DBConnection;
