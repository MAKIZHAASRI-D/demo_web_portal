
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // This will be hashed
  email: String,
  role: { type: String ,enum: ['admin', 'user']}
});

module.exports = mongoose.model('user', userSchema);
