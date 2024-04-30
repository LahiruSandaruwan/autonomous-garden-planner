const express = require('express');
const router = express.Router();
const ClimateData = require('../models/ClimateData');

// Route to create new climate data
router.post('/', async (req, res) => {
  try {
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
router.put('/:climateDataId', async (req, res) => {
  try {
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
router.delete('/:climateDataId', async (req, res) => {
  try {
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
