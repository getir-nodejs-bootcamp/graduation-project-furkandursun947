const ErrorModel = require("../models/error.model");


// This middleware handles the error and sends to user.
module.exports = (error, req, res, next) => {
    const errorResponse = new ErrorModel(error.message, error.status);
    // ? In this step, we can log the error to proper file
    res.status(errorResponse.status || 500);
    res.json({
        error:{
            message: error.message || "Internal Server Error.",
        },
    });
}


