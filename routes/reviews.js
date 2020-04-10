const express = require('express')
const router = express.Router({ mergeParams: true })

// require route handlers
const {
    getReviews,
    getReview,
    createReview
} = require('../handlers/reviews')

// Advanced Results setup
const Review = require('../models/Review')
const advancedResults = require('../middleware/advancedResults')

// auth middleware
const { protect, authorize } = require('../middleware/auth')

// Main routes
router.route('/')
.get(advancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)
.post(protect, authorize('user', 'admin'), createReview)

router.route('/:id')
.get(getReview)

module.exports = router

// mergeParams is used to re-route from the resourse