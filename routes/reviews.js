const express = require('express')
const router = express.Router({ mergeParams: true })

// require route handlers
const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
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
.put(protect, authorize('user', 'admin'), updateReview)
.delete(protect, authorize('user', 'admin'), deleteReview)

module.exports = router

// mergeParams is used to re-route from the resourse
// when I update the Review average rating is not changing