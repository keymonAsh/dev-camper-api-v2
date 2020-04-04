const ErrorResponse = require('../uitils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')

// desc: Get all Bootcamps
// route: GET /api/bootcamps
// access: Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    const reqQuery = { ...req.query }
    const removeFields = ['select', 'sort', 'page', 'limit']
    removeFields.forEach(val => delete reqQuery[val])

    // ### Supposed to do the operaetor part but an alternative is passing $ directly to the query itself
    // let queryStr = JSON.stringify(req.query)
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // ### setting up the query
    let query = Bootcamp.find(reqQuery).populate('courses')

    // Select: fot displaying certain fiels
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // Sort
    if(req.query.sort) {
        const sortBy = req.query.sort
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1 // page number
    const limit = parseInt(req.query.limit) || 10 // bootcamps per page
    const startindex = (page - 1) * limit
    const endindex = page * limit
    query = query.skip(startindex).limit(limit)
    const total = await Bootcamp.countDocuments()

    // EXECUTION
    const bootcamps = await query

    // pagination response
    const pagination = {}

    if(endindex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(startindex > 0) {
        pagination.prev = {
            page: page -1,
            limit
        }
    }

    res.status(200).json({success: true, count: bootcamps.length, pagination, data: bootcamps})
})

// desc: Create a bootcamp 
// route: POST /api/bootcamps
// access: Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
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
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404))
    } 

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