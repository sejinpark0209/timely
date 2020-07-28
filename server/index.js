const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Controllers = require('./Controllers.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client/dist'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/:userid', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/:userid/schedules', (req, res) => {
  Controllers.getSchedules(req, res);
});

app.put('/api/:userid/schedules', (req, res) => {
  Controllers.putSchedule(req, res);
});

app.post('/api/:userid/schedules', (req, res) => {
  Controllers.postSchedule(req, res);
});

app.delete('/api/:userid/schedules/:scheduleid', (req, res) => {
  Controllers.deleteSchedule(req, res);
});

app.get('/api/footsteps', (req, res) => {
  Controllers.getFootsteps(req, res);
});

app.post('/api/footsteps', (req, res) => {
  Controllers.postFootsteps(req, res);
});


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })
}

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));