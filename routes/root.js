var router = require('express').Router(),
    pkg = require('../package.json');

module.exports = function(app) {
  this.app = app;

  router.get('/', function(req, res) {
    res.json({ service: pkg.name, version: pkg.version });
  });

  return router;
};

