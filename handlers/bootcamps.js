const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')

// desc: Get all Bootcamps
// route: GET /api/bootcamps
// access: Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    // refactered to advanced result middleware
    res.status(200).json(res.advancedResults)
})

// desc: Create a bootcamp 
// route: POST /api/bootcamps
// access: Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    // associate user id
    req.body.user = req.user.id

    // check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id })
    // check if user is admin or not
    if(publishedBootcamp && req.user.role != 'admin') {
        return next(new ErrorResponse(`user with id ${req.user.id} already published a bootcamp`, 400))
    }

    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({ success: true, data: bootcamp })
})

// desc: Get single bootcamp by id
// route: GET /api/bootcamps/:id
// access: Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: bootcamp})
})

// desc: Update bootcamp
// route: PUT /api/bootcamps/:id
// access: Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404))
    } 

    // ckecking owner
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} is not authoriized to update this bootcamp`, 401))
    }

    bootcamp = Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json({success: true, data: bootcamp})
})

// desc: Delete bootcamp
// route: DELETE /api/bootcamps/:id
// access: Private
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404))
    }
    
    // ckecking owner
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} is not authoriized to delete this bootcamp`, 401))
    }

    bootcamp.remove()

    res.status(200).json({success: true})
})

// ## ERROR I dealt with clear
// if(!bootcamp) {new ErrorResopnse}
// is a custom object with err.message and err.statusCode only
// while the catch err is an Error class object 

// ## cascaded delete function
// in delete route findByIdAndDelete is upadate to just findById
// and replace to .remove()
// in order to trigger the cascaded middleware