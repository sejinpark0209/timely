const Schedule = require('../database/Schedule.js')

function getSchedules(userId, callback) {
  const id = parseInt(userId);
  Schedule.find({ user_id: id }, callback);
}

module.exports = {
  getSchedules
}