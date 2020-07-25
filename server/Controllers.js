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


module.exports = {
  getSchedules
}