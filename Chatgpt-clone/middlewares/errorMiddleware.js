const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = error.message

    //mongoose cast Error
    if (error.name === "castError") {
        const message = "Resources Not Found"
        error = new errorResponse(message, 404);
    }

    //duplicate key error
    if (error.code === 11000) {
        const message = "Duplicate field value entered"
        error == new errorResponse(message,404)
    }

    //mongoose validation
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.message);
        error = new errorResponse(message, 404)
        res.status(error.statusCode || 500).json({
            success: false,
            error:error.message || "Server Error"
        })
    }
}

module.exports = errorHandler;