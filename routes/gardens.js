const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import Passport.js for authentication
const Garden = require('../models/Garden');
const { authorizeUser } = require('../middlewares/authMiddleware');

// Route to create a new garden
router.post('/', passport.authenticate('jwt', { session: false }), authorizeUser, async (req, res) => {
  try {
    // Check if user has the required role for creating a garden (e.g., admin)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const newGarden = new Garden(req.body);
    await newGarden.save();
    res.status(201).json(newGarden);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all gardens
router.get('/', async (req, res) => {
  try {
    const gardens = await Garden.find();
    res.status(200).json(gardens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get garden by ID
router.get('/:gardenId', async (req, res) => {
  try {
    const garden = await Garden.findById(req.params.gardenId);
    if (!garden) {
      return res.status(404).json({ message: 'Garden not found' });
    }
    res.status(200).json(garden);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update garden details
router.put('/:gardenId', passport.authenticate('jwt', { session: false }), authorizeUser, async (req, res) => {
  try {
    // Check if user has the required role for updating a garden (e.g., admin)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const updatedGarden = await Garden.findByIdAndUpdate(req.params.gardenId, req.body, { new: true });
    if (!updatedGarden) {
      return res.status(404).json({ message: 'Garden not found' });
    }
    res.status(200).json(updatedGarden);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete garden
router.delete('/:gardenId', passport.authenticate('jwt', { session: false }), authorizeUser, async (req, res) => {
  try {
    // Check if user has the required role for deleting a garden (e.g., admin)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const deletedGarden = await Garden.findByIdAndDelete(req.params.gardenId);
    if (!deletedGarden) {
      return res.status(404).json({ message: 'Garden not found' });
    }
    res.status(200).json({ message: 'Garden deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
