// backend/routes/foods.js


const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Get foods with optional category and search query
router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category && ['morning', 'lunch', '24-7'].includes(category)) {
    filter.category = category;
  }
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  try {
    const foods = await FoodItem.find(filter).populate('restaurant');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new food item (no auth for demo)
router.post('/', async (req, res) => {
  const { name, category, restaurantId, price, description } = req.body;
  if (!name || !category || !restaurantId || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (!['morning', 'lunch', '24-7'].includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }
  try {
    const food = new FoodItem({
      name,
      category,
      image,
      restaurant: restaurantId,
      price,
      description,
      stock: 0, 
    });
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
