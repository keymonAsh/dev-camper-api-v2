const express = require('express')
const router = express.Router()

// require route handlers
const {
    getBootcamps,
    createBootcamp,
    getBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../handlers/bootcamps')

router.route('/')
.get(getBootcamps)
.post(createBootcamp)

router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router