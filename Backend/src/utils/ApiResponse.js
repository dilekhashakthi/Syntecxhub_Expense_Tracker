class ApiResponse {
  constructor(statusCode, data, message = "Success", meta = undefined) {
    this.statusCode = statusCode;
    this.status = statusCode < 400 ? "success" : "error";
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }
}
module.exports = ApiResponse;
