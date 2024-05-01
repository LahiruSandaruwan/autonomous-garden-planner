const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import Passport.js for authentication
const SoilData = require('../models/SoilData');
const { authenticate, authorizeUser } = require('../middlewares/authMiddleware');

// Middleware to authorize based on user role
const authorizeRole = (requiredRole) => (req, res, next) => {
  if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Route to create new soil data
router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const newSoilData = new SoilData(req.body);
    await newSoilData.save();
    res.status(201).json(newSoilData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all soil data
router.get('/', async (req, res) => {
  try {
    const soilData = await SoilData.find();
    res.status(200).json(soilData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get soil data by ID
router.get('/:soilDataId', async (req, res) => {
  try {
    const soilData = await SoilData.findById(req.params.soilDataId);
    if (!soilData) {
      return res.status(404).json({ message: 'Soil data not found' });
    }
    res.status(200).json(soilData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update soil data
router.put('/:soilDataId', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const updatedSoilData = await SoilData.findByIdAndUpdate(req.params.soilDataId, req.body, { new: true });
    if (!updatedSoilData) {
      return res.status(404).json({ message: 'Soil data not found' });
    }
    res.status(200).json(updatedSoilData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete soil data
router.delete('/:soilDataId', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const deletedSoilData = await SoilData.findByIdAndDelete(req.params.soilDataId);
    if (!deletedSoilData) {
      return res.status(404).json({ message: 'Soil data not found' });
    }
    res.status(200).json({ message: 'Soil data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
