const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a title for the review"],
        maxlength: 100
    },
    text: {
        type: String,
        required: [true, "Please add a some text"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, "Please add a ratinf between 1 and 10"]
    },
    createdAT: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

// For One review per bootcamp
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Review', reviewSchema)