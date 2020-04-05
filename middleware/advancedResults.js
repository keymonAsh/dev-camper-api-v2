const advancedResults = (model, populate) => async (req, res, next) => {
    const reqQuery = { ...req.query }
    const removeFields = ['select', 'sort', 'page', 'limit']
    removeFields.forEach(val => delete reqQuery[val])

    // ### Supposed to do the operaetor part but an alternative is passing $ directly to the query itself
    // let queryStr = JSON.stringify(req.query)
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // ### setting up the query
    let query = model.find(reqQuery)

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
    const limit = parseInt(req.query.limit) || 10 // resource per page
    const startindex = (page - 1) * limit
    const endindex = page * limit
    query = query.skip(startindex).limit(limit)
    const total = await model.countDocuments()

    // checking for populate parameter
    if(populate) {
        query = query.populate(populate)
    }

    // EXECUTION
    const results = await query

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

    // return
    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }
    next()
}

module.exports = advancedResults
