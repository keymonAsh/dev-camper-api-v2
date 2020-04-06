const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// desc: Register User
// route: POST /api/register
// access: Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body
    const user = await User.create({ name, email, password, role })

    // Response 
    sendTokenResponse(user, 200, res)
}) 

// desc: Login User
// route: POST /api/login
// access: Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // ## Validation
    if(!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400))
    }
    // checking user
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorResponse("invalid Credentials", 401))
    }
    // checking password
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
        return next(new ErrorResponse("invalid Credentials", 401))
    }

    // Response 
    sendTokenResponse(user, 200, res)
}) 

//creating token and sending response with cookie
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}