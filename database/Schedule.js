const mongoose = require('mongoose');
const db = require('./index.js');

const scheduleSchema = new mongoose.Schema({
  user_id: Number,
  schedules: [{
    description: String,
    time: String,
    url: String,
    minbefore: Number,
    secbefore: Number
  }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;