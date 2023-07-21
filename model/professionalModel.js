const mongoose = require('mongoose')

const professionalSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    education : {
        type : String,
        required : true
    },
    location : {
        type : String
    },
    birthday : {
        type : Date
    },
    bio : {
        type : String
    },
    address : {
        type : String
    },
    image : {
        type : String
    },
    experience : {
        type : String
    },
    payment : {
        type : String
    },
    skill : {
        type : Array
    },
    google : {
        type : Boolean,
        default : false
    },
    blocked : {
        type : Boolean,
        default : false
    },
    emailVerified : {
        type : Boolean
    },
    token : {
        type : String
    },
    approved : {
        type : Boolean,
        default : false
    },
    rejected : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Professional',professionalSchema)