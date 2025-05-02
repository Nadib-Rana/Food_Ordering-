const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['morning', 'lunch', '24-7'], required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  source : { type: String, enum: ['GUB', 'STU'], required: true }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
