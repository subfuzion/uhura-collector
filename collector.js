var debug = require('debug')('app'),
    EventEmitter = require('events').EventEmitter,
    uhura = require('uhura'),
    util = require('util');

module.exports = Collector;
util.inherits(Collector, EventEmitter);

function Collector(port) {
  EventEmitter.call(this);
  this.port = port;
}

Collector.prototype.start = function () {
  var server = uhura.createServer(function (client) {
    client.on('event', function (data) {
      this.emit('event', data);
    }.bind(this));
  }.bind(this));

  server.on('listening', function () {
    debug('collector listening on port ' + this.port);
    this.emit('listening', server);
  }.bind(this));

  server.listen(this.port);
  return server;
};

