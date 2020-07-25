const mongoose = require('mongoose');
const db = require('./index.js');

const scheduleSchema = new mongoose.Schema({
  description: String,
  time: String,
  url: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;