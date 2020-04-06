const express = require('express')
const router = express.Router({ mergeParams: true })

// require route handlers
const {
    getCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
} = require('../handlers/courses')

// Advanced Results setup
const Course = require('../models/Course')
const advancedResults = require('../middleware/advancedResults')

// auth middleware
const { protect } = require('../middleware/auth')

// Main routes
router.route('/')
.get(advancedResults(Course, { path: 'bootcamp', select: 'name description' }), getCourses)
.post(protect, createCourse)

router.route('/:id')
.get(getCourse)
.put(protect, updateCourse)
.delete(protect, deleteCourse)

module.exports = router

// mergeParams is used to re-route from the resourse