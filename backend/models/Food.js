const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food_name: {
    type: String,
    required: true,
    trim: true
  },
  food_price: {
    type: Number,
    required: true,
    min: 0
  },
  food_image: {
    type: String,
<<<<<<< HEAD
    default: './images/Vanillashake.jpeg'
=======
    default: ''
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  is_available: {
    type: Boolean,
    default: true
>>>>>>> f5a76c9 (final commit)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);

