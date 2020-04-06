const express = require('express')
const router = express.Router()

// Require route handlers
const {
    getBootcamps,
    createBootcamp,
    getBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../handlers/bootcamps')

// Advanced Results setup
const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResults')

// Resourse Routes
const courseRouter = require('./courses')

// Re-routing to Resourse
router.use('/:bootcampId/courses', courseRouter)

// auth middleware
const { protect } = require('../middleware/auth')

// Main routes
router.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
.post(protect, createBootcamp)

router.route('/:id')
.get(getBootcamp)
.put(protect, updateBootcamp)
.delete(protect, deleteBootcamp)

module.exports = router