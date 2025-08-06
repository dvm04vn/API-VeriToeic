const User = require("../models/User");
const Profile = require("../models/Profile");

require("dotenv").config();

class UserController {
  // [GET] /user/profile-me
  async profile(req, res) {
    try {
      const userId = req.userID; // middleware phải gán đúng req.userID

      if (!userId) {
        return res.status(403).json({ message: "You are not logged in" });
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...data } = user._doc;

      const profile = await Profile.findOne({ userID: userId });

      return res.status(200).json({
        data: {
          user: data,
          profile: profile || null,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
