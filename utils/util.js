
const ERROR_CODES = {
  BAD_REQUEST: 400, // Invalid data passed
  NOT_FOUND: 404,   // Resource not found
  SERVER_ERROR: 500 // Default server error
};

const ERROR_MESSAGES = {
  BAD_REQUEST: 'Invalid data passed to the request.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'An error has occurred on the server.'
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
