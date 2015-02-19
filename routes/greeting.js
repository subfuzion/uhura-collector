var router = require('express').Router();

module.exports = function(app) {
  this.app = app;

  router.get('/', function(req, res) {
    res.json({ greeting: 'Hello World!' });
  });

  router.get('/:name', function(req, res) {
    var name = req.params.name;
    res.json({ greeting: 'Hello ' + name + '!' });
  });

  router.post('/:name', function(req, res) {
    var name = req.params.name,
        body = req.body;

    res.json({ greeting: 'Hello ' + name + '!', message: body.message });
  });

  return router;
};


