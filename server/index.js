var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.dir(msg);
    io.emit('new message', msg.content);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
