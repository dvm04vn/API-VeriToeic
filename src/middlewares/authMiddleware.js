const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary");

const checkToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token not found or invalid format" });
    }

    const token = authorization.split(" ")[1];
    console.log("🛡️ Verifying token with secret:", process.env.ACCESS_TOKEN);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
      if (err) {
        // 👉 Sửa chỗ này: 403 thay vì 500
        return res.status(403).json({ message: "Token is not valid" });
      }

      req.userID = data.id;
      req.role = data.role;
      next();
    });
  } catch (err) {
    // Có thể để phần cloudinary này nếu có upload ảnh
    if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

const decodeToken = async (token) => {
  try {
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    const decode = await new Promise((resole, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
        if (err) {
          return reject(new Error({ message: "token is not valid" }));
        }
        const { id } = data;
        resole(id);
      });
    });
    return decode;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkToken, decodeToken };
