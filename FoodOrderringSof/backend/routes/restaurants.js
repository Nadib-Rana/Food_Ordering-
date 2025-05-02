const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new restaurant (for simplicity, no auth here, can be extended)
router.post('/', async (req, res) => {
  const { name, providerType, description } = req.body;
  if (!name || !providerType || !['university', 'student'].includes(providerType)) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    const restaurant = new Restaurant({ name, providerType, description });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
