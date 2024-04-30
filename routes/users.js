const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import Passport.js for authentication
const User = require('../models/User');

// Route to register a new user
router.post('/register', async (req, res) => {
  // Your existing route handler code
});

// Route to get user details
router.get('/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Check if the requested user ID matches the authenticated user ID
    if (req.user._id.toString() !== req.params.userId) {
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
router.put('/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Check if the requested user ID matches the authenticated user ID
    if (req.user._id.toString() !== req.params.userId) {
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
router.delete('/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Check if the requested user ID matches the authenticated user ID
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
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
