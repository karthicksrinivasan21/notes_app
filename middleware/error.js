const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

//    Log to console for dev
    console.log(err, ":", req.originalUrl);

    //Mongoose bad ObjectId
    if(err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate error Code
    if (err.code === 11000) {
        let message = `Duplicate field value entered: ${err.message}`;
        if(message.includes('email')) {
            message = `Email is already registered. Please try other email`;
        }
        if(message.includes('userId')) {
            message = `UserId is already registered. Please try other User Id`;
        }
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        console.log(Object.values(err.errors).map(value => value));
        const message = Object.values(err.errors).map(value => value.message);

        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });

};

module.exports = errorHandler;