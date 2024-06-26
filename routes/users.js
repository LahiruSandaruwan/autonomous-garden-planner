const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import Passport.js for authentication
const User = require('../models/User');
const { authenticate, authorizeUser, isAdmin } = require('../middlewares/authMiddleware');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get user details
router.get('/:userId', authenticate, authorizeUser, async (req, res) => {
  try {
    // Check if the requested user ID matches the authenticated user ID
    if (req.user._id.toString() !== req.params.userId && !req.user.role === 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update user details
router.put('/:userId', authenticate, authorizeUser, async (req, res) => {
  try {
    // Check if the requested user ID matches the authenticated user ID
    if (req.user._id.toString() !== req.params.userId && !req.user.role === 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete user account
router.delete('/:userId', authenticate, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

