var partModel = require('./partModel.js');

module.exports = {
  create: function(req, res) {
    var part = new partModel(req.body);
    part.save(function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  read: function(req, res) {
    partModel
    .find(req.query)
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  getOne: function(req, res) {
    partModel
    .findById(req.params.id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },
  update: function(req, res){
    partModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  delete: function(req, res){
    partModel
    .findByIdAndRemove(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  }
};
