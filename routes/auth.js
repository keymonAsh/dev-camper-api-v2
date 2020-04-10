const express = require('express')
const router = express.Router()

// Require route handlers
const { register, login, getMe, forgotPassword, updateUser, updatePassword, logout } = require('../handlers/auth')

// auth middleware
const { protect } = require('../middleware/auth')

// Main routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', protect, getMe)
router.put('/updateuser', protect, updateUser)
router.put('/updatepassword', protect, updatePassword)
// router.post('/forgotpassword', forgotPassword)

module.exports = router

// forgotPassword route is work under progresss