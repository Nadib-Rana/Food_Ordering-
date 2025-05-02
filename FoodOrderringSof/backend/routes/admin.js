const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');

// Protect all admin routes
router.use(adminMiddleware);

// --- USERS ---

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user role
router.patch('/users/:id', async (req, res) => {
  const { role } = req.body;
  if (!['student', 'teacher', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.json({ message: 'User role updated', user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Admin can't delete self" });
    }
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- RESTAURANTS ---

// Get all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create restaurant
router.post('/restaurants', async (req, res) => {
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

// Update restaurant
router.patch('/restaurants/:id', async (req, res) => {
  try {
    const updateData = req.body;
    if (updateData.providerType && !['university', 'student'].includes(updateData.providerType)) {
      return res.status(400).json({ message: 'Invalid providerType' });
    }
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete restaurant
router.delete('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- FOODS ---

// Get all foods
router.get('/foods', async (req, res) => {
  try {
    const foods = await FoodItem.find().populate('restaurant');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create food item
router.post('/foods', async (req, res) => {
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
      restaurant: restaurantId,
      price,
      description,
    });
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update food item
router.patch('/foods/:id', async (req, res) => {
  const updateData = req.body;
  if (updateData.category && !['morning', 'lunch', '24-7'].includes(updateData.category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }
  try {
    const food = await FoodItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete food item
router.delete('/foods/:id', async (req, res) => {
  try {
    const food = await FoodItem.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ORDERS ---

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username role').populate('items.foodItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status
router.patch('/orders/:id', async (req, res) => {
  const { status } = req.body;
  if (!['processing', 'delivered'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    await order.save();
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;