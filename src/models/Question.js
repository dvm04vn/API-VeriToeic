const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: String,
    options: [String],
    correctAnswer: Number,
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    image: String,
    audio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
