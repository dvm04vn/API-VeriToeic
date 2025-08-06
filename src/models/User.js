const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  provider: { type: String, default: 'local' },
  provider_Id: { type: String },
  role: { type: String, default: 'user' },
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
