const User = require("../models/User");
const Profile = require("../models/Profile");

const { hashPass, decryptPass } = require("../util/hassPass");
const { setToken } = require("../util/JWTutil");

class AuthController {
  // [POST] /auth/register
  async register(req, res) {
    try {
      const { fullname, email, password } = req.body;

      // 1. Kiểm tra email đã tồn tại
      const isExist = await User.findOne({ email });
      if (isExist) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      // 2. Hash mật khẩu
      const hashedPassword = await hashPass(password);

      // 3. Tạo user mới
      const newUser = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });
      //
      // 4.0. Tách tên
      const nameParts = fullname.trim().split(" ");
      const first_name = nameParts.pop();
      const last_name = nameParts.join(" ");
      // 4. Tạo profile rỗng (liên kết userID)
      const newProfile = await Profile.create({
        userID: newUser._id,
        last_name,
        first_name,
        avatar: "",
        gender: "other",
        bio: "",
        facebook_url: "",
        instagram_url: "",
        tiktok_url: "",
        // bạn có thể thêm date_of_birth nếu muốn: date_of_birth: null
      });

      // 5. Loại bỏ mật khẩu khỏi phản hồi
      const { password: _, ...userData } = newUser._doc;

      // 6. Tạo access token
      const newAccessToken = setToken(res, userData);

      // 7. Trả về response chuẩn
      return res.status(201).json({
        data: [
          {
            user: userData,
            profile: newProfile,
          },
        ],
        meta: { token: newAccessToken },
      });
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }

  // [POST] /auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // 1. Kiểm tra email tồn tại
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }
      // 2. Kiểm tra mật khẩu
      const isMatch = await decryptPass(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: true, message: "Sai mật khẩu." });
      }
      // 3. Loại bỏ password trước khi trả về
      const { password: _, ...other } = user._doc;
      // 4. Tạo access token
      const newAccessToken = setToken(res, other);
      // 5. Trả về user và token
      return res.status(200).json({
        data: [other],
        meta: { token: newAccessToken },
      });
    } catch (err) {
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }

  // [GET] /auth/logout
  async logout(req, res, next) {
    try {
      // Xoá cả accessToken và refreshToken
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(200).json({
        data: [],
        meta: { message: "Đăng xuất thành công!" },
      });
    } catch (err) {
      return res.status(500).json({
        data: [],
        meta: {
          message: "Lỗi khi đăng xuất",
          error: err.message,
        },
      });
    }
    // try {
    //   await res.clearCookie("refreshToken");
    //   res.status(200).json({ data: { message: "logout successful" } });
    // } catch (error) {
    //   res.status(502).json({ message: error.message });
    // }
  }

  // [POST] auth/success (OAuth Google/Facebook)
  async authSuccess(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Chưa xác thực" });
      }

      const accessToken = setToken(res, req.user);

      res.status(200).json({
        status: "success",
        data: req.user,
        meta: { token: accessToken },
      });
    } catch (err) {
      res.status(500).json({ message: "Xác thực thất bại", error: err });
    }
  }
}

module.exports = new AuthController();
