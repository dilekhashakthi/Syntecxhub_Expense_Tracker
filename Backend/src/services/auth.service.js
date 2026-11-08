const User = require("../models/User.js");
const ApiError = require("../utils/ApiError.js");
const { signToken } = require("../utils/token.js");
const formatUser = require("../utils/formatUser.js");

async function registerUser(body, file) {
  const fullName = (body.fullName || body.fullname)?.trim();
  const email = body.email?.trim()?.toLowerCase();
  const password = body.password;

  const existing = await User.findOne({ email });

  if (existing) {
    throw new ApiError(409, "Email already exists.");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    profileImageUrl: file ? `/uploads/${file.filename}` : null,
  });
  const token = signToken({ id: user._id });

  return { token, user: formatUser(user) };
}

async function loginUser({ email, password }) {
  const normalizedEmail = email?.trim()?.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    throw new ApiError(401, "Email or password is incorrect.");
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    throw new ApiError(401, "Email or password is incorrect.");
  }

  const token = signToken({ id: user._id });

  return { token, user: formatUser(user) };
}

async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) throw new ApiError(401, "Account not found.");
  return user;
}

module.exports = { registerUser, loginUser, getUserById };
