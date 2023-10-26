// models/Message.js
const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    from: {
        type : String,
        required : true,
        ref: "Professional"
    },
    to: {
        type : String,
        required : true,
        ref: "User"
    },
    room: {
        type : String,
        required : true
    },
    status: {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Call', callSchema);
