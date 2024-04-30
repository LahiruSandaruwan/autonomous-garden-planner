const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// Route to create a new plant
router.post('/', async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get plant by ID
router.get('/:plantId', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update plant details
router.put('/:plantId', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.plantId, req.body, { new: true });
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(updatedPlant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete plant
router.delete('/:plantId', async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.plantId);
    if (!deletedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;