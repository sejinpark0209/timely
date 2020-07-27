const Schedule = require('../database/Schedule.js')
const moment = require('moment');

function getSchedules(userId, callback) {
  const id = parseInt(userId);
  Schedule.find({ user_id: id }, callback);
}

// function putSchedules(userId, updatedSchedules, callback) {
//   console.log('putschedule!!!')
//   console.log(userId);
//   console.log(updatedSchedules)
//   const id = parseInt(userId);
//   Schedule.update({ user_id: id },
 //   {
//       $set: {
//         schedules: updatedSchedules,
//       },
//     }, callback);
// }

function putSchedules(userId, updatedSchedules, callback) {
  console.log('putschedule!!!')
  console.log(userId);
  console.log(updatedSchedules)
  const id = parseInt(userId);
  // Schedule.update({ user_id: id },
  //   {
  //     $set: {
  //       schedules: updatedSchedules,
  //     },
  //   }, callback);
}

function putSchedule(userId, updatedSchedule, callback) {
  console.log('putschedule!!!')
  console.log(userId);
  console.log(updatedSchedule)
  const id = parseInt(userId);
  const newSchedule = JSON.parse(updatedSchedule);

  console.log(typeof newSchedule)
  Schedule.findOneAndUpdate({ user_id: id }, { $set: { schedules: newSchedule }}, callback);
}

//working version
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