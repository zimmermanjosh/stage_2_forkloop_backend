class UnauthorizedError extends Error {
  constructor(message = "Unauthorized access") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
