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

// Main routes
router.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
.post(createBootcamp)

router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router