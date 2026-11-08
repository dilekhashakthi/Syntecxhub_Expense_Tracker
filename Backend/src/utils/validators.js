const ApiError = require("./ApiError");

function validateRegistration(body = {}) {
  const fullName = (body?.fullName || body?.fullname)?.trim();
  const email = body?.email?.trim();
  const password = body?.password;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "Enter your name, email and password.");
  }
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters.");
  }
}

function validateLogin(body = {}) {
  const email = body?.email?.trim();
  const password = body?.password;

  if (!email || !password) {
    throw new ApiError(400, "Enter your email and password.");
  }
}

function validateTransaction(body = {}, labelField) {
  const label = (
    body?.[labelField] ||
    (labelField === "source" ? body?.category : body?.source) ||
    body?.title
  )?.trim();
  const amount = Number(body?.amount);

  if (!label) {
    throw new ApiError(400, `Enter a ${labelField}.`);
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new ApiError(400, "Amount must be a number greater than 0.");
  }

  const dateVal = body?.date ? new Date(body.date) : null;
  if (!dateVal || Number.isNaN(dateVal.getTime())) {
    throw new ApiError(400, "Choose a valid date.");
  }

  return {
    icon: body?.icon || "",
    label,
    amount,
    date: dateVal,
  };
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateTransaction,
};
