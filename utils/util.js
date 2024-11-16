const ERROR_CODES = {
  BAD_REQUEST: 400, // Invalid data passed
  NOT_FOUND: 404, // Resource not found
  SERVER_ERROR: 500, // Default server error
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "This is a Bad Request data syntax or operation is incorrect.",
  NOT_FOUND: "Resource(s) not found.",
  SERVER_ERROR:
    "An error has occurred on the server. Doesnt exist or couldn't be processed.",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
