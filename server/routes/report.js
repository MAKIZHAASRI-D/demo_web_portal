const express = require('express');
const router = express.Router();
const DisaProduction = require('../models/disaproduction1');

router.get('/report', async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) return res.status(400).json({ error: 'From and To dates are required.' });

  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999); // Include full "to" day

    const data = await DisaProduction.find({
      date: { $gte: fromDate, $lte: toDate },
    }).sort({ date: 1 });

    res.json(data);
  } catch (err) {
    console.error('Error fetching report:', err);
    res.status(500).json({ error: 'Server error while fetching data' });
  }
});

module.exports = router;
