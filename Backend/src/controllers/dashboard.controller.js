const asyncHandler = require("../utils/asyncHandler.js");
const dashboardService = require("../services/dashboard.service.js");
const ApiResponse = require("../utils/ApiResponse.js");

const getDashboard = asyncHandler(async (req, res) => {
  const summery = await dashboardService.getDashboardSummary(req.user._id);
  new ApiResponse(200, summery).send(res);
});

module.exports = getDashboard;
