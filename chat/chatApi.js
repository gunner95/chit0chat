'use strict'

var app=angular.module('chatApi',[]);
app.controller('chatController',function($scope){
  $scope.message="";
  $scope.peopleOnlineCount="";
  $scope.submit=function(){
    socket.emit('message',$scope.message);
  }
  socket.on('clientCount',function(count){
    $scope.peopleOnlineCount=count;
  })
  socket.on('messageAll',function(msg){
    // angular.element('#chatBox').append(msg);
    // var box= document.createElement("div");
    // box.innerHTML=text(msg);
    // box.css({
    //   "background-color":"yellow"
    // });
    angular.element('#chatBox').append($('<ul>').text(msg));
    // angular.element('#chatBox').addClass('yoman');
  })
// $scope.

})
