const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// Get delivery status for an order
router.get('/:orderId/status', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ status: order.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// For demo: update delivery status (would be admin feature in real app)
router.post('/:orderId/status', authMiddleware, async (req, res) => {
  // For demo, allow any logged in user to update status
  const { status } = req.body;
  if (!['processing', 'delivered'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    await order.save();
    res.json({ message: 'Status updated', status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
