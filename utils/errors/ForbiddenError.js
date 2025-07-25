class ForbiddenError extends Error {
    constructor(message = 'Access forbidden') {
        super(message);
        this.statusCode = 403;
    }
}
module.exports = ForbiddenError;