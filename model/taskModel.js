const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    from: {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref: "Professional"
    },
    to: {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref: "User"
    },
    endtime: {
        type : Date,
        required : true
    },
    task: {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Task', taskSchema)