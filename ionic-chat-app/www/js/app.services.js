angular.module('ionic-chat-app-services', [])
  .service('ChatService', function ChatService($rootScope) {

    // Init the Websocket connection
    var socket = io.connect('http://localhost:8080');

    // Bridge events from the Websocket connection to the rootScope
    socket.on('UserConnectedEvent', function(user){
      console.log("UserConnectedEvent to client");
      socket.emit('UserConnectedEvent', user); // publish the global event
    });
    socket.on('MessageReceivedEvent', function(message){
      console.log("MessageReceivedEvent");
      socket.emit('MessageReceivedEvent', message); // publish global event
    });

    /*
    * Send a message to the server
    * bind this to the scope
    * @param message
    * */
    this.emit = function (message) {
      console.log("send message  : ", message);
      socket.emit('MessageSentEvent', message);  // send the message to the server
    };

    this.on = {
      // user connect
      userConnected: function (callback) {
        $rootScope.$on('UserConnectedEvent',
          function (event, user) {
            callback(user);
          })
      },
      // mesage received
      messageReceived: function (callback) {
        $rootScope.$on('MessageReceivedEvent',
          function (event, message) {
            callback(message);
          })
      }
    }
  });
