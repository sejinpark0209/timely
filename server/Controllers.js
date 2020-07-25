const Models = require('./Models.js');

function getSchedules(req, res) {
  Models.getSchedules((err, data) => {
    if(err) {
      res.status(400).send(data);
    } else  {
      res.status(200).send(data);
    }
  });
}


module.exports = {
  getSchedules
}