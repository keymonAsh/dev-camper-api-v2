const express = require('express')
const router = express.Router()

// Require route handlers
const { register, login, getMe, forgotPassword } = require('../handlers/auth')

// auth middleware
const { protect } = require('../middleware/auth')

// Main routes
router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/forgotpassword', forgotPassword)

module.exports = router