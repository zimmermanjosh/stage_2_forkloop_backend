const ERROR_CODES = {
  UNDEFINED: 0, // undefined error
  OK: 200, // ok response
  CREATED: 201, // Resource created successfully
  UNAUTHORIZED: 401, // Unauthorized access
  BAD_REQUEST: 400, // Invalid data passed
  FORBIDDEN: 403, // Access forbidden
  NOT_FOUND: 404, // Resource not found
  CONFLICT: 409, // Conflict
  SERVER_ERROR: 500, // Default server error
};

const ERROR_MESSAGES = {
  UNDEFINED: "An error occurred.",
  UNAUTHORIZED: "Unauthorized access.",
  OK: "Request successful.",
  CREATED: "Resource created successfully.",
  CONFLICT: "Email already exists.",
  BAD_REQUEST: "Invalid data passed.",
  NOT_FOUND: "Resource not found.",
  SERVER_ERROR: "Internal server error.",
  FORBIDDEN: "Access forbidden",
  INVALID_ID: "Invalid ID format",
  ITEM_NOT_FOUND: "Item not found",
  UNAUTHORIZED_DELETE: "You are not authorized to delete this item"
};

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = { ERROR_CODES, ERROR_MESSAGES, UnauthorizedError };
