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
// Connec tthe websocket handler to our server
var websocket = require('socket.io')(server);

// create a handler for incoming websocket connections
websocket.on('connection', function(socket){
    console.log("server: New user connnected");
    // Tell others a new connected
    socket.broadcast.emit('UserConnectedEvent', null);
    // Bind event handler for incoming messages
    socket.on('MessageSentEvent', function(chatData){
        console.log('server: Received new chat message');
        // By using the 'broadcast' connector, we will
        // send the message to everyone except the send.
        socket.broadcast.emit('MessageReceivedEvent', chatData);
    });
});
server.listen(8080);
console.log("listen to 8080");