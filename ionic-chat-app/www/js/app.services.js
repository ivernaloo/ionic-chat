angular.module('ionic-chat-app-services', [])
  .service('ChatService', function ChatService($rootScope) {

    // Init the Websocket connection
    var socket = io.connect('http://localhost:8080');

    // Bridge events from the Websocket connection to the rootScope
    socket.on('UserConnectedEvent', function(user){
      $rootScope.$emit('UserConnectedEvent', user); // publish the global event
    });

    /*
    * Send a message to the server
    * @param message
    * */
    socket.on('MessageReceivedEvent', function(message){
      $rootScope.$emit('MessageReceivedEvent', message); // publish global event
    });
    this.emit = function (message) {
      socket.emit('MessageSentEvent', message);  // send the message to the server
    };

    this.on = {
      // user connect
      userConnected: function (callback) {
        $rootScope.$on('UserConnectedEvent', function (event, user) {
            callback(user);
        })
      },
      // mesage received
      messageReceived: function (callback) {
        $rootScope.$on('MessageReceivedEvent', function (event, message) {
            callback(message);
        })
      }
    }
  });
