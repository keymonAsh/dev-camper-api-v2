const express = require('express')
const router = express.Router({ mergeParams: true })

// require route handlers
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
 } = require('../handlers/users')

// Advanced Results setup
const User = require('../models/User')
const advancedResults = require('../middleware/advancedResults')

// auth middleware
const { protect, authorize } = require('../middleware/auth')

// Main routes
router.use(protect)
router.use(authorize('admin'))

router.route('/')
.get(advancedResults(User),  getUsers)
.post(createUser)

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)


module.exports = router