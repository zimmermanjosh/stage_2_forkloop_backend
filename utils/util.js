const ERROR_CODES = {
  UNDEFINED: 0, // undefined error
  OK: 200, // ok response
  CREATED: 201, // Resource created successfully
  UNAUTHORIZED: 401, // Unauthorized access
  BAD_REQUEST: 400, // Invalid data passed
  NOT_FOUND: 404, // Resource not found
  SERVER_ERROR: 500, // Default server error
};

const ERROR_MESSAGES = {
  UNDEFINED: "An error occurred.",
  UNAUTHORIZED: "Unauthorized access.",
  OK: "Request successful.",
  CREATED: "Resource created successfully.",
  BAD_REQUEST: "Invalid data passed.",
  NOT_FOUND: "Resource not found.",
  SERVER_ERROR: "Internal server error.",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
