class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
