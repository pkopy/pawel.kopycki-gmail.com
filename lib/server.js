var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;
const http = require('http');

const server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
})

const wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: true
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

// wsServer.on('request', function(request) {
//     console.log(request)
//     if (!originIsAllowed(request.origin)) {
//         // Make sure we only accept requests from an allowed origin
//         request.reject();
//         console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//         return;
//     }
//
//     const connection = request.accept('echo-protocol', request.origin);
//     console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', function(message) {
//         console.log(message)
//         if (message.type === 'utf8') {
//             console.log('Received Message: ' + message.utf8Data);
//             connection.sendUTF(message.utf8Data);
//         }
//         else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });
wsServer.on('connect', (xx) => {
    console.log(xx)
})
wsServer.on('request', (aa) => {
    console.log(aa)
})

wsServer.on('close', () => console.log('closse'))