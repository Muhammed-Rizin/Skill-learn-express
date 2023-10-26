const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    rating : {
        type: Number,
        required : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    professional : {
        type : mongoose.Schema.ObjectId,
        ref : 'Professional'
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Review',reviewSchema)