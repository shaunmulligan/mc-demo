const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

io.on('connection', function(socket){
  console.log('a user connected');
  randomEmit(socket, 0);
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

