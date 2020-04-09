const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// desc: Get all Users
// route: GET /api/admin/users
// access: Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
}) 

// desc: Get single User
// route: GET /api/admin/user/:id
// access: Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({ success: true, data: user })
}) 

// desc: Create user
// route: POST /api/admin/user
// access: Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user })
}) 

// desc: Update user
// route: PUT /api/admin/user/:id
// access: Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(201).json({ success: true, data: user })
})

// desc: Delete user
// route: DELETE /api/admin/user/:id
// access: Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(201).json({ success: true })
}) 
