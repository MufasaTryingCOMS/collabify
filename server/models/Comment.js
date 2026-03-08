const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  goal:      { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  task:      { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);