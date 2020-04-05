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

// Main routes
router.route('/')
.get(getCourses)
.post(createCourse)

router.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse)

module.exports = router

// mergeParams is used to re-route from the resourse