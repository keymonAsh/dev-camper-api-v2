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

// Main routes
router.route('/')
.get(advancedResults(Course, { path: 'bootcamp', select: 'name description' }), getCourses)
.post(createCourse)

router.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse)

module.exports = router

// mergeParams is used to re-route from the resourse