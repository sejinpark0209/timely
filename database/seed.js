const process = require('process');
const db = require('./index.js');
const moment = require('moment');
const Schedule = require('./Schedule.js');

const sampleSchedules = [
  {
  user_id: 0,
  schedules: [{
    description: "KICK OFF",
    time: moment(new Date(2020, 7, 26, 16, 35, 0)).format('lll'),
    url: "https://bit.ly/HRSF2-zoom"
    },
    {
    description: "PM Check In",
    time: moment(new Date(2020, 7, 27, 13, 24, 0)).format('lll'),
    url: "https://bit.ly/HRSF2-zoom"
    },
    {
    description: "MVP solo",
    time: moment(new Date(2020, 7, 27, 13, 24, 0)).format('lll'),
    url: "https://google.com"
    }]
  },
  {
    user_id: 1,
    schedules: [{
      description: "SDC",
      time: moment(new Date(2020, 7, 28, 13, 24, 0)).format('lll'),
      url: "https://google.com"
      },
      {
      description: "preparty",
      time: moment(new Date(2020, 7, 28, 13, 24, 0)).format('lll'),
      url: "https://youtube.com"
      },
      {
      description: "toy problem",
      time: moment(new Date(2020, 7, 29, 13, 24, 0)).format('lll'),
      url: "https://momentjs.com/"
      }]
    },
    {
      user_id: 2,
      schedules: [{
        description: "Morning meeting",
        time: moment(new Date(2020, 7, 27, 13, 24, 0)).format('lll'),
        url: "https://google.com"
        },
        {
        description: "Evening meeting",
        time: moment(new Date(2020, 7, 28, 13, 24, 0)).format('lll'),
        url: "https://google.com/"
        }]
      }
];

const insertSampleSchedules = function () {
  Schedule.create(sampleSchedules)
    .then(() => process.exit());
};

insertSampleSchedules();
