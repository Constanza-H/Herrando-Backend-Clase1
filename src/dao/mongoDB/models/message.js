const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, 
  isRead: { type: Boolean, default: false }, 
  attachments: [String],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
