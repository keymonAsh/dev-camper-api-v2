const asyncHandler = func => (req, res, next) =>
    Promise
    .resolve(func(req, res, next))
    .catch(next)

module.exports = asyncHandler

// this function replaces the try_catch block of every async middleware function
// mainly focused to route handlers