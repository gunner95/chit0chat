'use strict';

var express  = require('express');
var app      = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var bodyParser = require('body-parser');

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log(socket);
  // var temp = JSON.parse(socket);
  // console.log(temp);
  io.emit('clientCount',socket.server.clientsCount);
  socket.on('message',function(msg){
    console.log(msg);
    io.emit('messageAll',msg);
  })
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
  // socket.send('welcome to the local node.js server!');
});

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/chat'));
server.listen(process.env.PORT || 5000);
// io.on('connection',function(socket){
//   console.log('user connected');
// })
// var socket = io.listen(server);
