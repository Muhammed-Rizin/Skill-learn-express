// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messages: [
    {
      text: { type: String, required: true },
      sender: { type: mongoose.Schema.Types.ObjectId, refPath: 'messages.senderType', required: true },
      recever: { type: mongoose.Schema.Types.ObjectId, refPath: 'messages.receverType', required: true },
      time: { type: Date, required: true },
      senderType: { type: String, enum: ['User', 'Professional'], required: true },
      receverType: { type: String, enum: ['User', 'Professional'], required: true },
    },
  ],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roomId: { type: String, required: true },
  userRead : {type : Boolean, default: false},
  professionalRead : {type : Boolean, default: false}
});

module.exports = mongoose.model('Message', messageSchema);
