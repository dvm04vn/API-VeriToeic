const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    bio: { type: String, maxlength: 500 },
    date_of_birth: { type: Date },
    facebook_url: { type: String },
    instagram_url: { type: String },
    tiktok_url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
