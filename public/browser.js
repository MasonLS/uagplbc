'use strict';

navigator.geolocation.getCurrentPosition(function(position){
  var userCoords = {
    lat: position.coords.latitude,
    long: position.coords.longitude
  };
  var socket = io();

  socket.on('new message', function(msg){
    console.log(msg);
  });

  document.getElementById('chat-form').addEventListener('submit', function(e){
    e.preventDefault();
    var content = document.getElementById('chat-msg').value;
    socket.emit('chat message', {content: content, userCoords: userCoords});
  });

});
