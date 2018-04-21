const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user Connected');

  socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


  socket.on('createMessage', (message) => {
    console.log('creareMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
   });




  socket.on('disconnect', () => {
  console.log('One client has Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
