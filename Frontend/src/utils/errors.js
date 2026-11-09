export const getErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again.",
) => {
  if (error?.response) {
    const { message, details } = error.response.data ?? {};
    if (Array.isArray(details) && details.length)
      return details.map((d) => d.message).join(" ");
    return message || fallback;
  }
  if (error?.code === "ECONNABORTED")
    return "The server took too long to respond. Please try again.";
  if (error?.request)
    return "Cannot reach the server. Check that the backend is running.";
  return fallback;
};