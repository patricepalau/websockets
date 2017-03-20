var http = require('http');
var WebSocketServer = require('websocket').server;

var server = http.createServer(function (request, response) {
  response.writeHead(404);
  response.end();
});

var webSocketServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

var port = 7080;

server.listen(port, function () {
  const now = new Date();
  console.log(`${now} - server listening on ${port}`);
});

webSocketServer.on('request', function (request) {
  var connection = request.accept('foo', request.origin);
  console.log('Connection accepted');
  
  connection.on('message', function (message) {
    const now = new Date();
    console.log(`${now} - received message:`, message);
    connection.sendUTF('Hello from server!');
  });
  
  connection.on('close', function (code, description) {
    const now = new Date();
    console.log(`${now} - connection closed by remote host ${connection.remoteAddress}`);
  });
});
