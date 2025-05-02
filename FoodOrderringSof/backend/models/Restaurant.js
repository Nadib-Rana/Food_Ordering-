const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  providerType: { type: String, enum: ['university', 'student'], required: true },
  description: { type: String },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
