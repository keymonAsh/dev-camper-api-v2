
// desc: Get all Bootcamps
// route: GET /api/bootcamps
// access: Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true})
}

// desc: Create a bootcamp 
// route: POST /api/bootcamps
// access: Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success: true})
}

// desc: Get single bootcamp by id
// route: GET /api/bootcamps/:id
// access: Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true})
}

// desc: Update bootcamp
// route: PUT /api/bootcamps/:id
// access: Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true})
}

// desc: Delete bootcamp
// route: DELETE /api/bootcamps/:id
// access: Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true})
}
