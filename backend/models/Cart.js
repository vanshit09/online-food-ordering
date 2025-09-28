const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  }
}, {
  timestamps: true
});

// Ensure one cart item per user per food
cartSchema.index({ user_id: 1, food_id: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);

