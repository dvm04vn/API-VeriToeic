const Quiz = require("../models/Quiz");

// Tạo quiz mới
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    console.error("❌ Lỗi khi tạo quiz:", err);
    res.status(400).json({ message: "Không thể tạo quiz", error: err });
  }
};

// Lấy toàn bộ quiz
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy quiz", error: err });
  }
};

// Lấy quiz theo ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz không tồn tại" });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err });
  }
};

// Cập nhật quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: "Không thể cập nhật quiz", error: err });
  }
};

// Xoá quiz
exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz đã được xoá" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá quiz", error: err });
  }
};
