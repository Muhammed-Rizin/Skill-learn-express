// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messages: [{
    text: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'messages.senderType'
    },
    recever : {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'messages.receverType'
    },
    time: {
      type: Date,
    },
    senderType: {
      type: String,
      enum: ['User', 'Professional'],
      default: 'User',
    },
    receverType: {
      type: String,
      enum: ['User', 'Professional'],
      default: 'Professional',
    }
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'messages.senderType'
  }],
  roomId : {type : String, required : true}
});

module.exports = mongoose.model('Message', messageSchema);
