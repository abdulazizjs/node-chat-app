const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user Connected');

  socket.emit('newMessage', {
    from: 'John',
    text: 'see yo then',
    createAt: 123123
  });

  socket.on('creareMessage', (message) => {
    console.log('creareMessage', message);
  })

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });



  socket.on('disconnect', () => {
  console.log('One client has Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
