var http = require('http');
var fs = require('fs');

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

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    randomEmit(socket, 0);
});

server.listen(8080);
