#!/usr/bin/env node

var app = require('express')(),
    bodyParser = require('body-parser'),
    Collector = require('./collector'),
    debug = require('debug')('app'),
    express = require('express'),
    morgan = require('morgan'),
    path = require('path');

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

if (require.main === module) {
  app.set('port', process.env.PORT || 3000);

  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  // attach socket.io to app
  app.set('io', io);

  io.on('connection', function (socket) {
    console.log('new websocket connection');
  });

  server.listen(app.get('port'), function() {
    debug('server started on port %s', server.address().port);
    app.set('server', server);

    // create an event collector and attach to app
    var collector = new Collector(process.env.EVENTPORT || 5555);
    app.set('collector', collector);

    collector.on('event', function(data) {
      io.emit('event', data);
    });

    collector.start();
  });
}
