const Schedule = require('../database/Schedule.js')
const moment = require('moment');

function getSchedules(userId, callback) {
  const id = parseInt(userId);
  Schedule.find({ user_id: id }, callback);
}

function putSchedule(userId, updatedSchedule, callback) {
  const id = parseInt(userId);
  const newSchedule = JSON.parse(updatedSchedule);

  Schedule.findOneAndUpdate({ user_id: id }, { $set: { schedules: newSchedule }}, callback);
}

//working version
function postSchedule(userId, description, time, url, minbefore, secbefore, callback) {
  const id = parseInt(userId);
  const mindiff = parseInt(minbefore);
  const secdiff = parseInt(secbefore);
  Schedule.update({ user_id: id },
    {
      $push: {
        schedules: {
          description: description,
          time: time,
          url: url,
          minbefore: mindiff,
          secbefore: secdiff
        },
      },
    }, callback);
}

function deleteSchedule(userId, scheduleId, callback) {
  const id = parseInt(userId);
  Schedule.update({ user_id: id },
    {
      $pull: {
        schedules: {
          _id: scheduleId
        },
      },
    }, callback);
}

module.exports = {
  getSchedules,
  postSchedule,
  deleteSchedule,
  putSchedule
}