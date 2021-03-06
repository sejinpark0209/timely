const Schedule = require('../database/Schedule.js')
const Footstep = require('../database/Footstep.js')
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
// function postSchedule(userId, description, time, url, minbefore, secbefore, callback) {
//   const id = parseInt(userId);
//   const mindiff = parseInt(minbefore);
//   const secdiff = parseInt(secbefore);
//   Schedule.update({ user_id: id },
//     {
//       $push: {
//         schedules: {
//           description: description,
//           time: time,
//           url: url,
//           minbefore: mindiff,
//           secbefore: secdiff
//         },
//       },
//     }, callback);
// }

function postSchedule(userId, description, time, url, minbefore, secbefore, callback) {
  const id = parseInt(userId);
  const mindiff = parseInt(minbefore);
  const secdiff = parseInt(secbefore);

  Schedule.count({ user_id: userId }, function (err, count) {
    if(count > 0) {
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
    } else {
      const newSchedule = new Schedule({
        user_id: id,
        schedules: [{
          description: description,
          time: time,
          url: url,
          minbefore: mindiff,
          secbefore: secdiff
        }]
      });
      newSchedule.save(callback);
    }
  });
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

function getFootsteps(callback) {
  Footstep.find({}, callback).sort({createdAt: -1});
}

function postFootsteps(username, message, createdAt, callback) {
  Footstep({username: username, message: message, createdAt: createdAt}).save(callback);
}

module.exports = {
  getSchedules,
  postSchedule,
  deleteSchedule,
  putSchedule,
  getFootsteps,
  postFootsteps,
}