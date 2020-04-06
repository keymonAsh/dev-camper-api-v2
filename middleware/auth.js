const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../uitils/ErrorResponse')
const User = require('../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // else if(req.cookies.token) {
    //     token = req.cookies.token
    // }

    if(!token) {
        return next(new ErrorResponse("Not autherized to access this route / no token", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        return next(new ErrorResponse("Not autherized to access this route / wrong token", 401))
    }
})