import bcrypt from 'bcryptjs';

export const hashPass = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // ✅ dùng hàm async
    const hash = await bcrypt.hash(password, salt); // ✅ dùng hàm async
    return hash;
  } catch (e) {
    console.log("Lỗi hash mật khẩu:", e);
    throw e; // Nên throw để controller bắt được lỗi
  }
};
export const decryptPass = async (password, passDB) => {
  try {
    const decryptPassword = await bcrypt.compare(password, passDB);
    return decryptPassword;
  } catch (error) {
    console.log(error);
  }
};

