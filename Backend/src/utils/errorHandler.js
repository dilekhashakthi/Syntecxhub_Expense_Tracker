const ApiError = require("./ApiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
  let message = err.message || "Internal server error";
  let details = err.details;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = err.errors
      ? Object.values(err.errors).map((e) => ({
          field: e.path,
          message: e.message,
        }))
      : undefined;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
    message = `Duplicate value for field: ${field}`;
  }

  if (err.name === "MulterError") {
    statusCode = 400;
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File too large. Maximum size is 2MB.";
    } else {
      message = err.message;
    }
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  if (statusCode === 500 && !err.isOperational) {
    console.error("UNEXPECTED ERROR: ", err);
    message = "Internal server error";
    details = undefined;
  }

  const finalStatusCode =
    Number.isInteger(statusCode) && statusCode >= 100 && statusCode < 600
      ? statusCode
      : 500;

  res.status(finalStatusCode).json({
    status: "error",
    message,
    ...(details && { details }),
  });
};

module.exports = { notFound, errorHandler };
