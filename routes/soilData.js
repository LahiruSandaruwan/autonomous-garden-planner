const express = require('express');
const router = express.Router();
const SoilData = require('../models/SoilData');

// Route to create new soil data
router.post('/', async (req, res) => {
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
router.put('/:soilDataId', async (req, res) => {
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
router.delete('/:soilDataId', async (req, res) => {
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
