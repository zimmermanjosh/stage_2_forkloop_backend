class BadRequestError extends Error {
    constructor(message = 'Invalid data passed') {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = BadRequestError;