const Question = require("../models/Question");
const Topic = require("../models/Topic");

class QuestionController {
  // Tạo
  async createQuestion(req, res) {
    try {
      const { questionText, options, correctAnswer, topicSlug } = req.body;

      if (!topicSlug) {
        return res.status(400).json({ message: "Thiếu topicSlug" });
      }
      const topic = await Topic.findOne({ slug: topicSlug });
      if (!topic) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy topic với slug này" });
      }

      const newQuestion = new Question({
        questionText,
        options,
        correctAnswer,
        topicId: topic._id,
        image: req.file?.image || "", // nếu có multer xử lý ảnh
        audio: req.file?.audio || "", // nếu có multer xử lý audio
      });

      const saved = await newQuestion.save();

      res.status(201).json(saved);
    } catch (error) {
      console.error("❌ Lỗi khi tạo câu hỏi:", error);
      res
        .status(500)
        .json({ message: "Không thể tạo câu hỏi", error: error.message });
    }
  }

  async getAllQuestions(req, res) {
    try {
      const questions = await Question.find().populate("topicId");
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Không thể tải danh sách câu hỏi" });
    }
  }

  // update
  async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const updated = await Question.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // delete
  async deleteQuestion(req, res) {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.json({ message: "Xoá thành công" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // lấy tất cả câu hỏi theo id của topic
  async getQuestionsByTopic(req, res) {
    try {
      const { slug } = req.params;
      const topic = await Topic.findOne({ slug });
      if (!topic) {
        return res.status(404).json({ message: "Không tìm thấy topic" });
      }
      const questions = await Question.find({ topicId: topic._id }); // 🟢 Phải lọc đúng topicId
      res.status(200).json(questions);
    } catch (error) {
      console.log("Lỗi khi lấy câu hỏi theo topicSlug", error);
      res.status(500).json({ message: "lỗi server" });
    }
  }
  // lấy câu hỏi theo id
  async getQuestionById(req, res) {
    try {
      const { slug } = req.params;
      const topic = await Topic.findOne({ slug });
      if (!topic) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy topic với slug này" });
      }

      const questions = await Question.find({ topicId: topic._id });

      if (!questions)
        return res.status(404).json({ message: "Không tìm thấy câu hỏi" });
      res.status(200).json(questions);
    } catch (err) {
      console.log("Lỗi khi lấy câu hỏi theo topicSlug", error);
      res.status(500).json({ message: "lỗi server" });
    }
  }
}

module.exports = new QuestionController();
