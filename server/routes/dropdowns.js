const express = require('express');
const router = express.Router();
const Dropdowns = require('../models/Dropdowns');




router.get('/api/dropdowns', async (req, res) => {
  try {
    const data = await Dropdowns.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dropdowns', error: err.message });
  }
});

router.post('/api/dropdowns/add', async (req, res) => {
  const { field, value } = req.body; // field = 'projectNames' or 'statuses' or 'users'

  if (!['projectNames', 'statuses', 'users'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field name' });
  }

  try {
    let dropdown = await Dropdowns.findOne();
    if (!dropdown) {
      dropdown = new Dropdown({ projectNames: [], statuses: [], users: [] });
    }

    if (!dropdown[field].includes(value)) {
      dropdown[field].push(value);
      await dropdown.save();
    }

    res.json({ message: `${value} added to ${field}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add dropdown option', error: err.message });
  }
});

// DELETE an option from a specific field
router.delete('/api/dropdowns/delete', async (req, res) => {
  const { field, value } = req.body;

  if (!['projectNames', 'statuses', 'users'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field name' });
  }

  try {
    const dropdown = await Dropdowns.findOne();
    if (!dropdown) return res.status(404).json({ message: 'Dropdowns not found' });

    dropdown[field] = dropdown[field].filter(item => item !== value);
    await dropdown.save();

    res.json({ message: `${value} deleted from ${field}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete dropdown option', error: err.message });
  }
});


// MODIFY (Update) an option in a specific field
/*router.put('/api/dropdowns/update', async (req, res) => {
  const { field, oldValue, newValue } = req.body;

  if (!['projectNames', 'statuses', 'users'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field name' });
  }

  try {
    const dropdown = await Dropdowns.findOne();
    if (!dropdown) return res.status(404).json({ message: 'Dropdowns not found' });

    const index = dropdown[field].indexOf(oldValue);
    if (index === -1) return res.status(404).json({ message: 'Old value not found' });

    dropdown[field][index] = newValue;
    await dropdown.save();

    res.json({ message: `${oldValue} updated to ${newValue} in ${field}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update dropdown option', error: err.message });
  }
});*/

router.put('/api/dropdowns/update', async (req, res) => {
  const { field, oldValue, newValue } = req.body;

  if (!['projectNames', 'statuses', 'users'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field name' });
  }

  try {
    const dropdown = await Dropdowns.findOne();
    if (!dropdown) return res.status(404).json({ message: 'Dropdowns not found' });

    const index = dropdown[field].indexOf(oldValue);
    if (index === -1) return res.status(404).json({ message: 'Old value not found' });

    dropdown[field][index] = newValue;
    await dropdown.save();

    res.json({ message: `${oldValue} updated to ${newValue} in ${field}` });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update dropdown option', error: err.message });
  }
});

// DELETE ALL values from a specific field (e.g., projectNames, statuses, users)
router.delete('/api/dropdowns/deleteAll', async (req, res) => {
  const { field } = req.body;

  if (!['projectNames', 'statuses', 'users'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field name' });
  }

  try {
    const dropdown = await Dropdowns.findOne();
    if (!dropdown) return res.status(404).json({ message: 'Dropdown document not found' });

    dropdown[field] = [];
    await dropdown.save();

    res.json({ message: `All values deleted from ${field}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete all values', error: err.message });
  }
});


module.exports = router;
