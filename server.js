'use strict';

var express  = require('express');
var app      = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
    // var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
mongoose.connect('mongodb://pratyush1995:chunmun1998@ds153735.mlab.com:53735/chit0chat');
var Cat = mongoose.model('Cat',{name:String});
var kitty = new Cat({name:'eshita'});
kitty.save();
app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  // console.log(socket.server.eio.clients);
  // var temp = JSON.parse(socket);
  // console.log(temp);
  // console.log(socket.id);
  // var tweet={'user':socket.server.eio.clients};
  // io.emit('check',tweet);
  io.emit('clientCount',socket.server.eio.clientsCount);
  // io.emit('clientCount',socket.server.eio.clientsCount);
  socket.on('message',function(msg){
    console.log(msg);
    io.emit('messageAll',msg);
  })
  socket.on('typing',function(type){
    io.emit('typeAll',type);
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
