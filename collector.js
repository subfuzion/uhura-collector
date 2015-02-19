var debug = require('debug')('app'),
    uhura = require('uhura');

exports.start = function (port) {
  var server = uhura.createServer(function (client) {
    client.on('event', function (data) {
      processEvent(data);
    });
  });

  server.on('listening', function () {
    debug('collector listening on port ' + port);
  });

  server.listen(port);
  return server;
};

function processEvent(data) {
  console.log(data);
}

