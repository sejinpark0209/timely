const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/joinontime';

const db = mongoose.connect(mongoUri);

module.exports = db;