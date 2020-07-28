const mongoose = require('mongoose');
const db = require('./index.js');

const footstepSchema = new mongoose.Schema({
  username: String,
  message: String,
  },
  {
    timestamps: true
  }
);

const Footstep = mongoose.model('Footstep', footstepSchema);

module.exports = Footstep;