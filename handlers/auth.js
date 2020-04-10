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

// desc: Get loggedIn user
// route: POST /api/me
// access: private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, data: user })
})

// desc: Logout
// route: GET /api/logout
// access: private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', { 
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ success: true, data: user })
})

// desc: Update loggedIn user
// route: PUT /api/updateUser DETAILS
// access: private
exports.updateUser = asyncHandler(async (req, res, next) => {
    const fields = { name: req.body.name, email: req.body.email }

    const user = await User.findByIdAndUpdate(req.user.id, fields, { new: true, runValidators: true })
    res.status(200).json({ success: true, data: user })
})

// desc: Update loggedIn user PASSWORD
// route: PUT /api/updatepassword
// access: private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    // chech current pass
    if(!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401))
    }

    // setting new password
    user.password = req.body.newPassword

    await user.save()

    sendTokenResponse(user, 200, res)
})

// desc: Forgot passwaord
// route: POST /api/forgotpassword
// access: public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user) {
        return next(new ErrorResponse(`No user with ${req.body.email}`, 404))
    }

    // reset token 
    const resetToken = user.getResetPasswordToken()
    
    await user.save({ validateBeforeSave: false })

    res.status(200).json({ success: true, data: user })
})

// creating token and sending response with cookie
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