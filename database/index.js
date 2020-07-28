const mongoose = require('mongoose');


const mongoUri = 'mongodb://localhost:27017/timely';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

// const mongoUri = 'mongodb://localhost:27017/timely';

// const db = mongoose.connect(process.env.MONGODB_URI || mongoUri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected!');
})

module.exports = db;