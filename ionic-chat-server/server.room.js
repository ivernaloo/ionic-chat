var http = require('http');
var url = require('url');
var fs = require('fs');
var server = http.createServer(function(req, res){
    var parseUrl = url.parse(req.url, true);
    switch (parseUrl.pathname){
        case '/':
            // Read the file into memory and push it to the client
            fs.readFile('index.html', function(err, content){
                if (err){
                    res.writeHead(500);
                    res.end();
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf-8');
                }
            })
            break;
    }
});
server.listen(8080);
console.log("listen to 8080");

server.on('listening', function(){
    console.log("websocket server is listening on port", 8080);
})
// Connec tthe websocket handler to our server
var websocket = require('socket.io')(server);
// Configure the chat rooms
['node', 'javascript', 'haskell', 'erlang', 'scala'].forEach(function (chatRoom){
    websocket.of('/' + chatRoom).on('connection',
    function(socket){
        console.log("New user connected to", chatRoom);
        // Tell others  a new user connected
        socket.broadcast.emit('UserConnectedEvent', null);
        // Bind event handler for incoming messages
        socket.on('MessageSendEvent', function(chatData){
            console.log('Received new chat message', chatData);
            // By using the boradcast connector, we will
            // send the message to everyone except the sender
            socket.broadcast.emit('MessageReceivedEvent', chatData);
        })
    })
});