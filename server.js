const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
var state = [];

const server = app.listen(process.env.PORT || 1337, function () {
  console.log('The server is listening on port 1337!');
});

var io = socketio(server);

io.on('connection', function (socket) {
  console.log('A new client has connected!');
  console.log(socket.id);
  socket.on('disconnect', function() {
    console.log(':-(');
  });
  if(state.length) {
    socket.emit('state', state);
  }
  socket.on('doodle', event => {
    state.push(event);
    socket.broadcast.emit('drawData', event);
  });
});

app.use(express.static(path.join(__dirname, 'browser')));

app.use(express.static(path.join(__dirname, 'public')));
