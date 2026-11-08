const path = require("path");
require("dotenv").config();
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config({ path: path.resolve(__dirname, "src/.env") });

const connectDB = require("./src/config/db");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
}

start();
