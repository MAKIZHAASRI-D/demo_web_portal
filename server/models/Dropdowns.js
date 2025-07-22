
const mongoose = require('mongoose');

const dropdownsSchema = new mongoose.Schema({
  projectNames: [String],
  statuses: [String],
  users: [String],
});

module.exports = mongoose.model('Dropdowns', dropdownsSchema);
