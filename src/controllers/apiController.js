const User = require("../models/User");
const { setToken } = require("../util/JWTutil");

class ApiController {
  // [POST] /api/auth/success
  async authSuccess(req, res) {
    console.log("Backend đã vào authSuccess");
    console.log("Body", req.body);  
    try {
      const userId = req?.user?._id || req?.body?._id;

      if (!userId) {
        return res.status(401).json({ message: "Không có thông tin người dùng." });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }

      const accessToken = setToken(res, user);
      const { password: _, ...userData } = user.toObject();

      return res.status(200).json({
        status: "success",
        data: userData,
        meta: { token: accessToken },
      });
    } catch (err) {
      console.error("🔥 Lỗi authSuccess:", err); // log lỗi ra console
      return res.status(500).json({ message: "Xác thực thất bại", error: err.message || err });
    }
  }
}

module.exports = new ApiController();

// // Lấy profile
// async profile(req, res) {
//   try {
//     const { userId } = req.user;

//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: true, message: "Không xác thực." });
//     }

//     res.status(200).json({
//       error: false,
//       user,
//       message: "Lấy thông tin thành công.",
//     });
//   } catch (err) {
//     console.error("❌ Profile error:", err);
//     res.status(500).json({ error: true, message: "Lỗi máy chủ." });
//   }
// }
