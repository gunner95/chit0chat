'use strict'

var app=angular.module('chatApi',[]);
app.controller('chatController',function($scope){
  $scope.message="";
  $scope.peopleOnlineCount="";
  $scope.typing=false;
  $scope.type="";
  console.log(socket);
  $scope.submit=function(){
    socket.emit('message',$scope.message);
    // socket.emit('yo',socket.)
    $scope.message="";
    $scope.type="";
  }
  socket.on('clientCount',function(count){
    $scope.peopleOnlineCount=count;
  })
  socket.on('check',function(client){
    angular.forEach(client,function(value,key){
      console.log(value);
    })
  })
  socket.on('messageAll',function(msg){
    // angular.element('#chatBox').append(msg);
    // var box= document.createElement("div");
    // box.innerHTML=text(msg);
    // box.css({
    //   "background-color":"yellow"
    // });
    // var m=$('<ul>');
    // var i=$('<ul>');
    // angular.element('#chatBox').append(i.text(socket.id));
    // angular.element('#chatBox').append(m.text(msg));
    // m.attr('id','text');
    // i.attr('id','userId');
    // angular.element('#text').addClass('yo');
    // angular.element('#chatBox').append($('<ul>').text(socket.id));
    angular.element('#chatBox').append($('<ul><br>').text(msg));

    angular.element('ul').addClass('yo');

    // angular.element('#chatBox').addClass('yoman');
  })
  $scope.timeoutFunction = function(){
    $scope.typing=false;
    socket.emit('typing',false);
  }
  socket.on('typeAll',function(type){
    console.log(type);
    $scope.$apply(function(){
      if(type)
      $scope.type="typing";
      else {
      $scope.type="";
      }
    })

  })
  $('#message').keydown(function(){
  if($scope.typing==false){
    $scope.typing=true;
    socket.emit('typing',true);
    var time=setTimeout(function () {
      $scope.timeoutFunction();
    }, 3000);
  }else{
    clearTimeout(time);
  }
});
})
