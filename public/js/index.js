var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newUser', function(message){
  console.log(message.text);
})

socket.on('disconnect', function() {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
