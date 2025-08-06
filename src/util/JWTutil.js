require("dotenv").config();
const jwt = require("jsonwebtoken");

const AccessToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, role: user.role },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.END_TIME_ACCESS,
    }
  );
};

const RefreshToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.END_TIME_REFRESH,
  });

const setToken = (res, user) => {
  const newAccessToken = `Bearer ${AccessToken(user)}`;
  const newRefreshToken = RefreshToken(user);
  res.cookie("RefreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return newAccessToken;
};
module.exports = {
  AccessToken,
  RefreshToken,
  setToken,
};
