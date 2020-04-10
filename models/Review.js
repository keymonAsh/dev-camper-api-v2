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

// mongoose middleware to calculate average Rating of bootcamp 
reviewSchema.statics.getAverageRating = async function(bootcampId) {
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRating: { $avg: '$rating' }
            }
        }
    ])
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
        })
    } catch (err) {
        console.log(err)
    }
}

// updating average rating after adding a coures
reviewSchema.post('save', function() {
    this.constructor.getAverageRating(this.bootcamp)
})

// updating average cost before deleting course
reviewSchema.pre('remove', function() {
    this.constructor.getAverageRating(this.bootcamp)
})

module.exports = mongoose.model('Review', reviewSchema)