var http = require('http');
var io = require('socket.io');
var express = require('express');

var PORT = 80;

function random (low, high) {
	return Math.random() * (high - low) + low;
}

function randomEmit (socket, x) {
  var y = randDelay = Math.floor(random(100, 1500));

  setTimeout(function() {
    x += Math.floor(y / 100);
    if (socket.conn && socket.conn.readyState === 'open') {
      data = { x: x, y: y };
      socket.emit('randData', data);
      randomEmit(socket, x)
    }
  }, 1000);
}

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/static'))
server.listen(PORT, function() {
	console.log("server is listening on port", PORT);
});

io = io.listen(server);

io.on('connection', function(socket) {
	randomEmit(socket, 0);
});
