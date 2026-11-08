const asyncHandler = require("../utils/asyncHandler.js");
const formatUser = require("../utils/formatUser.js");
const authService = require("../services/auth.service.js");
const {
  validateRegistration,
  validateLogin,
} = require("../utils/validators.js");
const ApiResponse = require("../utils/ApiResponse.js");

const register = asyncHandler(async (req, res) => {
  validateRegistration(req.body);

  const { user, token } = await authService.registerUser(req.body, req.file);
  new ApiResponse(201, { user, token }, "User registered successfully").send(
    res,
  );
});

const login = asyncHandler(async (req, res) => {
  validateLogin(req.body);

  const { user, token } = await authService.loginUser(req.body);
  new ApiResponse(200, { user, token }, "User login successfully").send(res);
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user._id);
  new ApiResponse(200, { user: formatUser(user) }).send(res);
});

module.exports = { register, login, getMe };
