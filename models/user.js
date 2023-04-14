const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true ['name is required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ["user", "admin"],
    type: String,
    default: "user"
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
