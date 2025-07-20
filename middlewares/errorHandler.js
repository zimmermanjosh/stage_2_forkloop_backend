const errorHandler = (err, req, res, next) => {
    if (err.statusCode) {
        return res.status(err.statusCode).send({ message: err.message });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid data passed' });
    }
    if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid ID format' });
    }
    if (err.code === 11000) {
        return res.status(409).send({ message: 'Email already exists' });
    }
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
    return res.status(500).send({ message: 'Internal server error' });
};
module.exports = errorHandler;