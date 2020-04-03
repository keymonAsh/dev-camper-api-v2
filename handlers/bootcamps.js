const Bootcamp = require('../models/Bootcamp')

// desc: Get all Bootcamps
// route: GET /api/bootcamps
// access: Public
exports.getBootcamps = async (req, res, next) => {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
}

// desc: Create a bootcamp 
// route: POST /api/bootcamps
// access: Private
exports.createBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
}

// desc: Get single bootcamp by id
// route: GET /api/bootcamps/:id
// access: Public
exports.getBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    res.status(200).json({success: true, data: bootcamp})
}

// desc: Update bootcamp
// route: PUT /api/bootcamps/:id
// access: Private
exports.updateBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) 
    res.status(200).json({success: true, data: bootcamp})
}

// desc: Delete bootcamp
// route: DELETE /api/bootcamps/:id
// access: Private
exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true})
}
