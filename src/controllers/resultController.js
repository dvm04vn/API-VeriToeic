const Result = require('../models/Result');
const Question = require("../models/Question");

class ResultController {
  async submitResult(req, res) {
    const { userId, topicId, answers } = req.body;

    const quizzes = await Question.find({ topicId });
    let score = 0;

    quizzes.forEach((quiz, index) => {
      if (answers[index] === quiz.correctAnswer) score++;
    });

    const newResult = await Result.create({ userId, topicId, answers, score });
    res.json({ message: "Bài thi đã được nộp", result: newResult });
  }
  async getResultByQuiz(req, res) {
    const results = await Result.find({ topicId: req.params.quizId });
    res.json(results);
  }
}

module.exports = new ResultController();
