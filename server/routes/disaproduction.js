
const express = require('express');
const router = express.Router();
const DisaProduction = require('../models/disaproduction1');

// POST new entry
router.post('/api/production/add', async (req, res) => {
  try {
    const entry = new DisaProduction(req.body);
    await entry.save();
    res.json({ message: 'Production data saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err.message });
  }
});

// GET all entries
router.get('/api/production', async (req, res) => {
  try {
    const entries = await DisaProduction.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

module.exports = router;
