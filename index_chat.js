var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket)
{
  socket.on('chat message', function(msg){
    console.log(Number(msg.user),msg.idUser);

      io.emit('chat message', msg);  
    
  });
   socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat message2', 'me desconecte');
  });
  
  socket.on('conectar',function(data){
    console.log('me conecte'+data);
    io.emit('user online', data);
  });
  
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:3000');
});