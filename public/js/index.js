var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.emit('createEmail', {
  to: 'jen@example.com',
  text: 'Hey this is Abdulaziz'
});

socket.emit('creareMessage',{
  from: 'Abdulaziz',
  text: 'Thats for me'
});

socket.on('disconnect', function() {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
