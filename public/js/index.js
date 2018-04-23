var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newUser', function(message){
  console.log(message.text);
});

function scrollBottom (){
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    //console.log("Should scroll");
    messages.scrollTop(scrollHeight);
  }
}




socket.on('disconnect', function() {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message){

var formattedTime = moment(message.createAt).format('h:mm a');
var template = jQuery('#message-template').html();
var html = Mustache.render(template, {
  text: message.text,
  from: message.from,
  createAt: formattedTime
});
scrollBottom();
jQuery('#messages').append(html);

  // //console.log('newMessage', message);
  // var formattedTime = moment(message.createAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createAt).format('h:mm a');
  var locationTemplate = jQuery('#location-message-template').html();
  var html = Mustache.render(locationTemplate, {
    from: message.from,
    createAt: formattedTime,
    url: message.url
  })
  scrollBottom();
  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('create-location', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })
});
