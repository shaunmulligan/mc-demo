var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

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



// When a client connects, we note it in the console
io.on('connection', function (socket) {
    console.log('A client is connected!');
    randomEmit(socket, 0);
});
