const express = require('express');
const bodyParser = require('body-parser');
const Controllers = require('./Controllers.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client/dist'));

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

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));