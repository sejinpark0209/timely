const process = require('process');
const db = require('./index.js');
const Schedule = require('./Schedule.js');

const sampleSchedules = [
  {
  user_id: 0,
  schedules: [{
    description: "KICK OFF",
    time: new Date(2020, 7, 25, 13, 24, 0),
    url: "https://bit.ly/HRSF2-zoom"
    },
    {
    description: "PM Check In",
    time: new Date(2020, 7, 25, 14, 29, 0),
    url: "https://bit.ly/HRSF2-zoom"
    },
    {
    description: "MVP solo",
    time: new Date(2020, 8, 25, 12, 24, 0),
    url: "https://google.com"
    }]
  },
  {
    user_id: 1,
    schedules: [{
      description: "SDC",
      time: new Date(2021, 2, 25, 13, 24, 0),
      url: "https://google.com"
      },
      {
      description: "preparty",
      time: new Date(2020, 7, 25, 3, 2, 0),
      url: "https://youtube.com"
      },
      {
      description: "toy problem",
      time: new Date(2020, 2, 5, 15, 23, 0),
      url: "https://momentjs.com/"
      }]
    },
    {
      user_id: 2,
      schedules: [{
        description: "Morning meeting",
        time: new Date(2020, 8, 2, 8, 30, 0),
        url: "https://google.com"
        },
        {
        description: "Evening meeting",
        time: new Date(2020, 8, 2, 18, 30, 0),
        url: "https://google.com/"
        }]
      }
];

const insertSampleSchedules = function () {
  Schedule.create(sampleSchedules)
    .then(() => process.exit());
};

insertSampleSchedules();
