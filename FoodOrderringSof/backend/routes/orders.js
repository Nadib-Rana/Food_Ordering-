const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

// Place an order from the cart
router.post('/place', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.foodItem');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    const amount = cart.items.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
    const order = new Order({
      user: req.user._id,
      items: cart.items.map(i => ({ foodItem: i.foodItem._id, quantity: i.quantity })),
      amount,
      status: 'processing',
    });
    await order.save();

    // Clear cart after order placement
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's order history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.foodItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
