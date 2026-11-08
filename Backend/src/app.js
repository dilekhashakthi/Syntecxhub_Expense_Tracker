const path = require("path");
require("dotenv").config();
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config({ path: path.resolve(__dirname, "src/.env") });

const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const { UPLOAD_DIR } = require("./middleware/upload.middleware.js");
const { errorHandler, notFound } = require("./utils/errorHandler.js");

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(UPLOAD_DIR));

// routes
app.use("/api/v1", routes);

// error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
