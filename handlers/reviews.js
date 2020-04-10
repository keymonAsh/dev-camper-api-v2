const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const Review = require('../models/Review')

// desc: Get all Reviews
// route: GET /api/reviews AND /api/bootcamps/bootcampId/reviews
// access: Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    // refactered to advanced result middleware
    if(req.params.bootcampId) {
        const reviews = await Review.find({bootcamp: req.params.bootcampId})
        return res.status(200).json({ success: true, count: reviews.length, data: reviews })
    } else {
       res.status(200).json(res.advancedResults)
    }
})

// desc: Get Review
// route: GET /api/courses/:id
// access: Public
exports.getReview = asyncHandler(async (req, res, next) => {
   const review = await Review.findById(req.params.id).populate({ path: 'bootcamp', select: 'name description'})

   if(!review) {
       return next(new ErrorResponse(`No reviews found with the id ${req.params.id}`, 404))
   }

   res.status(200).json({ success: true, data: review })
})

// desc: Create Review
// route: POST /api/courses AND /api/bootcamps/:bootcampId/reviews
// access: Private
exports.createReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp) {
        return next(new ErrorResponse(`NO bootcamps with Id og ${req.params.bootcampId}`, 404))
    }

    const review = await Review.create(req.body)

    res.status(201).json({ success: true, data: review })
})

// desc: Create Review
// route: PUT /api/reviews/:id
// access: Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id)

    if(!review) {
        return next(new ErrorResponse(`NO Reviews with Id og ${req.params.bootcampId}`, 404))
    }

    // Review ownership
    if(review.user.toString() !== req.user.id && req.user.role !== "admin") {
        next(new ErrorResponse("Not autheorized to update review", 404))
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(201).json({ success: true, data: review })
})

// desc: delete Review
// route: DELETE /api/reviews/:id
// access: Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id)

    if(!review) {
        return next(new ErrorResponse(`NO Reviews with Id og ${req.params.bootcampId}`, 404))
    }

    // Review ownership
    if(review.user.toString() !== req.user.id && req.user.role !== "admin") {
        next(new ErrorResponse("Not autheorized to update review", 404))
    }

    await review.remove()

    res.status(201).json({ success: true })
})
