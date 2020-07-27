const Models = require('./Models.js');

function getSchedules(req, res) {
  const userId = req.params.userid;
  Models.getSchedules(userId, (err, data) => {
    if(err) {
      res.status(400).send(data);
    } else  {
      res.status(200).send(data);
    }
  });
}

function postSchedule(req, res) {
  const userId = req.params.userid;
  const { description, formatTimeStr, url, minbefore, secbefore } = req.body;
  Models.postSchedule(userId, description, formatTimeStr, url, minbefore, secbefore, (err, data) => {
    if(err) {
      res.status(400).send(data);
    } else  {
      res.status(200).send(data);
    }
  });
}

function putSchedule(req, res) {
  const userId = req.params.userid;
  const updatedSchedule = req.body.data;

  Models.putSchedule(userId, updatedSchedule, (err, data) => {
    if(err) {
      res.status(400).send(data);
    } else  {
      res.status(200).send(data);
    }
  });
}

function deleteSchedule(req, res) {
  const userId = req.params.userid;
  const scheduleId = req.params.scheduleid;
  Models.deleteSchedule(userId, scheduleId, (err, data) => {
    if(err) {
      res.status(400).send(data);
    } else  {
      res.status(200).send(data);
    }
  });
}


module.exports = {
  getSchedules,
  postSchedule,
  deleteSchedule,
  putSchedule
}