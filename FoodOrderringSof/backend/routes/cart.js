const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const FoodItem = require('../models/FoodItem');
const authMiddleware = require('../middleware/authMiddleware');

// Get cart for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.foodItem');
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add/update item quantity in cart and decrement stock
router.post('/add', authMiddleware, async (req, res) => {
  const { foodItemId, quantity } = req.body;
  if (!foodItemId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  try {
    // Fetch the food item
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    // Check stock availability
    if (foodItem.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Decrement stock
    foodItem.stock -= quantity;
    await foodItem.save();

    // Update cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    const itemIndex = cart.items.findIndex(i => i.foodItem.toString() === foodItemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ foodItem: foodItemId, quantity });
    }
    await cart.save();

    const populatedCart = await cart.populate('items.foodItem');
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart (optional: adjust stock back)
router.post('/remove', authMiddleware, async (req, res) => {
  const { foodItemId } = req.body;
  if (!foodItemId) {
    return res.status(400).json({ message: 'foodItemId required' });
  }
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const item = cart.items.find(i => i.foodItem.toString() === foodItemId);
    if (item) {
      // Optionally restock the item
      const foodItem = await FoodItem.findById(foodItemId);
      if (foodItem) {
        foodItem.stock += item.quantity;
        await foodItem.save();
      }
    }
    // Remove from cart
    cart.items = cart.items.filter(i => i.foodItem.toString() !== foodItemId);
    await cart.save();

    const populatedCart = await cart.populate('items.foodItem');
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart after order placed (optional: restock all items)
router.post('/clear', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      // Optionally restock all items before clearing
      for (const item of cart.items) {
        const foodItem = await FoodItem.findById(item.foodItem);
        if (foodItem) {
          foodItem.stock += item.quantity;
          await foodItem.save();
        }
      }
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
