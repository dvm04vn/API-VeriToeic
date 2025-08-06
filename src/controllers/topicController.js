const Topic = require("../models/Topic");
const slugify = require("slugify");
const mongoose = require("mongoose");
class TopicController {
  // Lấy tất cả topic
  async getAllTopics(req, res) {
    try {
      const topics = await Topic.find().sort({ createdAt: +1 });
      res.json(topics);
    } catch (err) {
      console.log("lỗi khi lấy danh sách topics:",err)
      res.status(500).json({ error: "Server error" });
    }
  }

  // Tạo topic mới
  async createTopic(req, res) {
    try {
      const { name, description, part } = req.body;
      // tạo slug từ name
      const slug = slugify(name, { lower: true, strict: true, locale: "vi" });
      const newTopic = new Topic({ name, description, part, slug });

      const savedTopic = await newTopic.save();
      res.status(201).json(savedTopic);
    } catch (error) {
      console.error("Lỗi khi tạo topic:", error.message);
      res.status(500).json({ message: "Không thể tạo chủ đề" });
    }
  }
  // Cập nhật topic
  async updateTopic(req, res) {
    try {
      const { id } = req.params;
      const { name, description, part } = req.body;
      const slug = slugify(name, { lower: true, strict: true, locale: "vi" });
      const updated = await Topic.findByIdAndUpdate(
        id,
        {
          name,
          description,
          part,
          slug,
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Topic not found" });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Update failed" });
    }
  }
  // Xoá topic
  async deleteTopic(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Topic.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Topic not found" });
      res.json({ message: "Topic deleted" });
    } catch (err) {
      res.status(400).json({ error: "Delete failed" });
    }
  }
  // lấy topic theo id
  async getTopicById(req, res) {
    try {
      const { slug } = req.params;
      const topic = await Topic.findOne({ slug });
      if (!topic) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy topic với slug này" });
      }
      res.status(200).json(topic);
    } catch (error) {
        console.log("Lỗi khi lấy theo chủ đề slug: ", error);
        res.status(500).json({message: "Lỗi server"});
    }
  }
}

module.exports = new TopicController();
