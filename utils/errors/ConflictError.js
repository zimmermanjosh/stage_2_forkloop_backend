class ConflictError extends Error {
    constructor(message = 'Email already exists') {
        super(message);
        this.statusCode = 409;
    }
}

module.exports = ConflictError;