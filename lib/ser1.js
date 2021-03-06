const WebSocketServer = require('websocket').server;
const express = require('express')
const http = require('http');
const clients = []
const server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(5600, function() { });

// create the server
const wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {

    const connection = request.accept(null, request.origin);
    let index = clients.push(connection) - 1;
    // console.log('connection')
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        // console.log(message)
        if (message.type === 'utf8') {
            // process WebSocket message
            // console.log(clients)

            try {
                console.log(JSON.parse(message.utf8Data))
            } catch (e) {
                console.log(e)
            }


            for (let i=0; i < clients.length; i++) {
                clients[i].sendUTF(JSON.stringify(message.utf8Data));
            }
            // connection.sendUTF(JSON.stringify(message.utf8Data))
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});
