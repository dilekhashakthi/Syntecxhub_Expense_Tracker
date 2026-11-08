const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const { verifyToken } = require("../utils/token.js");
const User = require("../models/User.js");

const protect = asyncHandler(async (req, _res, next) => {
  let token;
  const header = req.headers.authorization || "";

  if (header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new ApiError(401, "Not authenticated. Please log in to continue.");
  }

  let decode;
  try {
    decode = verifyToken(token);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(decode.id);
  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  req.user = user;
  next();
});

module.exports = protect;
