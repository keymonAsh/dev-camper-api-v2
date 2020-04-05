const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')

// desc: Get all Courses
// route: GET /api/courses AND /api/bootcamps/bootcampId/courses
// access: Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    // refactered to advanced result middleware
    if(req.params.bootcampId) {
        const courses = await Course.find({bootcamp: req.params.bootcampId})
        return res.status(200).json({ success: true, count: courses.length, data: courses })
    } else {
       res.status(200).json(res.advancedResults)
    }
})

// desc: Create Course
// route: POST /api/bootcamp/:bootcampId/courses
// access: Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    // adding the bootcampId to the requseted body data
    req.body.bootcamp = req.params.bootcampId

    // finding the bootcamp to which course is adreteated cded 
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp) {
        next(new ErrorResponse(`No bootcamp with id: ${req.params.bootcampId}`, 404))
    }

    const course = await Course.create(req.body)

    res.status(200).json({ success: true, data: course })

})

// desc: Get Course
// route: GET /api/courses/:id
// access: Public
exports.getCourse = asyncHandler(async (req, res, next) => {
   const course = await Course.findById(req.params.id).populate({ path: 'bootcamp', select: 'name description' })

   if(!course) {
       next(new ErrorResponse(`No courses with id: ${req.params.id}`), 404)
   }

   res.status(200).json({ success: true, data: course })
})

// desc: Update Course
// route: PUT /api/courses/:id
// access: Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)

    if(!course) {
        next(new ErrorResponse(`No courses with id: ${req.params.id}`), 404)
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, data: course })
})

// desc: Delete Course
// route: DELETE /api/courses/:id
// access: Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)

    if(!course) {
        next(new ErrorResponse(`No courses with id: ${req.params.id}`), 404)
    }

    await course.remove()

    res.status(200).json({ success: true })
})
