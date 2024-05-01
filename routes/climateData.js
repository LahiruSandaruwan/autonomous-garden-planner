const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import Passport.js for authentication
const ClimateData = require('../models/ClimateData');
const { authorizeUser } = require('../middlewares/authMiddleware');

// Route to create new climate data
router.post('/', passport.authenticate('jwt', { session: false }), authorizeUser, async (req, res) => {
  try {
    // Check if user has the required role for creating climate data (e.g., admin)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const newClimateData = new ClimateData(req.body);
    await newClimateData.save();
    res.status(201).json(newClimateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all climate data
router.get('/', async (req, res) => {
  try {
    const climateData = await ClimateData.find();
    res.status(200).json(climateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get climate data by ID
router.get('/:climateDataId', async (req, res) => {
  try {
    const climateData = await ClimateData.findById(req.params.climateDataId);
    if (!climateData) {
      return res.status(404).json({ message: 'Climate data not found' });
    }
    res.status(200).json(climateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update climate data
router.put('/:climateDataId', passport.authenticate('jwt', { session: false }), authorizeUser, async (req, res) => {
  try {
    // Check if user has the required role for updating climate data (e.g., admin)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const updatedClimateData = await ClimateData.findByIdAndUpdate(req.params.climateDataId, req.body, { new: true });
    if (!updatedClimateData) {
      return res.status(404).json({ message: 'Climate data not found' });
    }
    res.status(200).json(updatedClimateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete climate data
router.delete('/:climateDataId', passport.authenticate('jwt', { session: false }), authorizeUser, async (req, res) => {
  try {
    // Check if user has the required role for deleting climate data (e.g., admin)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const deletedClimateData = await ClimateData.findByIdAndDelete(req.params.climateDataId);
    if (!deletedClimateData) {
      return res.status(404).json({ message: 'Climate data not found' });
    }
    res.status(200).json({ message: 'Climate data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
