const ErrorResponse = require('../uitils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    console.log(`ErrorHandler message: ${err.message}.`.red)
    
    // for handleing different errors
    let error = { ...err }
    error.message = err.message

    // Worng id
    if(err.name === "CastError") {
        const message = `Resource not found with id: ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Duplicate fields 
    if(err.code === 11000) {
        const message = "Duplicate field value Entered"
        error = new ErrorResponse(message, 400)
    }

    // Validation errors
    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({success: false, error: error.message || "Server error"})
}

module.exports = errorHandler

// ### Notes

// err {
//     message,
//     name,
//     value
// }

// err is ErrorResponse Object

// ### IN validataion errors
// err.errors is an array with all validataion error objects
// we just need the message field of that object