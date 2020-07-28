const process = require('process');
const db = require('./index.js');
const Footstep = require('./Footstep.js');

const sampleFootsteps = [
  {
    username: 'jin',
    message: 'first writing. hello everyone',
    createdAt: '2020-07-28T05:57:26.037Z'
  },
  {
    username: 'test',
    message: 'testing',
    createdAt: '2020-07-28T10:57:26.037Z'
  }
];

const insertSampleFootsteps = function () {
  Footstep.create(sampleFootsteps)
    .then(() => process.exit());
};

insertSampleFootsteps();
