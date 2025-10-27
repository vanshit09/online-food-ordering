const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
<<<<<<< HEAD
=======
  },
  role: {
    type: String,
    enum: ['customer', 'restaurant'],
    default: 'customer'
>>>>>>> f5a76c9 (final commit)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

