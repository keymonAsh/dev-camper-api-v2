const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')

// desc: Get all Courses
// route: GET /api/courses AND /api/bootcamps/bootcampId/courses
// access: Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query

    // checking the route and building the query
    if(req.params.bootcampId) {
        query = Course.find({bootcamp: req.params.bootcampId})
    } else {
        query = Course.find().populate({ path: 'bootcamp', select: 'name description' })
    }
    const courses = await query

    res.status(200).json({success: true, count: courses.length, data: courses})
})