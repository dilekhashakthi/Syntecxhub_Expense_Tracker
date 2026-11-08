const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const ApiError = require("../utils/ApiError.js");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${path.extname(file.originalname).toLowerCase()}`,
    ),
});

const fileFilter = (_req, file, cb) => {
  if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) return cb(null, true);
  cb(new ApiError(400, "Profile image must be a JPG, PNG, WebP or GIF file."));
};

const uploadProfileImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("profileImage");

module.exports = { UPLOAD_DIR, uploadProfileImage };
