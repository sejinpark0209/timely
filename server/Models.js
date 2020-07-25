const Schedule = require('../database/Schedule.js')

function getSchedules(callback) {
  Schedule.find({}, callback);
}

module.exports = {
  getSchedules
}