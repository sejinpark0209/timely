const Schedule = require('../database/Schedule.js')

function getSchedules(userId, callback) {
  const id = parseInt(userId);
  Schedule.find({ user_id: id }, callback);
}

function postSchedule(userId, description, time, url, callback) {
  const id = parseInt(userId);
  Schedule.update({ user_id: id },
    {
      $push: {
        schedules: {
          description: description,
          time: time,
          url: url
        },
      },
    }, callback);
}

function deleteSchedule(userId, scheduleId, callback) {
  const id = parseInt(userId);
  console.log(scheduleId)
  Schedule.update({ user_id: id },
    {
      $pull: {
        schedules: {
          _id: scheduleId
        }
      }
    }
  );
}

module.exports = {
  getSchedules,
  postSchedule,
  deleteSchedule
}