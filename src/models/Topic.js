const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    part: String,
    slug: { type: String, required: true, unique: true }, // ✅ Thêm slug
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
