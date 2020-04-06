const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// desc: Register User
// route: POST /api/bootcamps
// access: Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body

    const user = await User.create({ name, email, password, role })

    res.status(200).json({ success: true })
}) 