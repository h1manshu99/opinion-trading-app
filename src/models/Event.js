const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  status: String,
  odds: Object,
  startTime: Date,
  result: String,
});

module.exports = mongoose.model('Event', eventSchema);