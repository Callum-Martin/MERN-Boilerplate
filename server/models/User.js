const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  profileColor: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: '',
  },
});

module.exports = User = mongoose.model('user', UserSchema);
