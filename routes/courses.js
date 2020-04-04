const express = require('express')
const router = express.Router({ mergeParams: true })

// require route handlers
const {
    getCourses
} = require('../handlers/courses')

// Main routes
router.route('/')
.get(getCourses)

module.exports = router

// mergeParams is used to re-route from the resourse