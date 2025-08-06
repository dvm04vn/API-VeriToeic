const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: { type: String }, // hoặc ref User nếu có
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  answers: [Number], // danh sách câu trả lời của user
  score: Number
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
