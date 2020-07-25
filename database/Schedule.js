const mongoose = require('mongoose');
const db = require('./index.js');

const scheduleSchema = new mongoose.Schema({
  time: String,
  description: String,
  url: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;