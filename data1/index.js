const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(8080);


function random(low, high) {
  'use strict';
  return Math.random() * (high - low) + low;
}

function randomEmit(socket, x) {
  'use strict';
  var y = Math.floor(random(100, 1500));

  setTimeout(function() {
    x += Math.floor(y / 100);
    if (socket.conn && socket.conn.readyState === 'open') {
      let data = {
        x: x,
        y: y
      };
      socket.emit('randData', data);
      randomEmit(socket, x);
    }
  }, 1000);
}

io.on('connection', function(socket) {
  'use strict';
  console.log('a user connected');
  randomEmit(socket, 0);
});
