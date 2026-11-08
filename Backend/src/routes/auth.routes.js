const express = require("express");
const { getMe, login, register } = require("../controllers/auth.controller.js");
const protect = require("../middleware/auth.middleware.js");
const { uploadProfileImage } = require("../middleware/upload.middleware.js");

const router = express.Router();

router.post("/register", uploadProfileImage, register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
