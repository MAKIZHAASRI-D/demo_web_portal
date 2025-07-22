
// models/DisaProduction.js
const mongoose = require('mongoose');

const disaProductionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  shift: String,
  operatorName: String,
  machineId: String,
  startTime: String,
  endTime: String,
  totalMoulds: Number,
  acceptedMoulds: Number,
  rejectedMoulds: Number,
  remarks: String,
});

module.exports = mongoose.model('DisaProduction', disaProductionSchema);
//mongoose.models.DisaProduction || mongoose.model('DisaProduction', disaProductionSchema);