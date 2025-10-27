const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], required: true },
  total_amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['placed', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);


