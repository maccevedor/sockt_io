var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket)
{
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
   socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat message2', 'me desconecte');
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:3000');
});