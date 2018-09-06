#!/usr/bin/env node

const fs = require('fs');
const WebSocketServer = require('websocket').server;
const WebSocketService = require('../util/WebSocketService');
const app = require('../app');
const debug = require('debug')('smarthouse-api:server');
const https = require('https');

const options = {
    key: fs.readFileSync('./resources/key.pem'),
    cert: fs.readFileSync( './resources/cert.pem' )
};

const port = normalizePort(process.env.PORT || '4567');
app.set('port', port);

const server = https.createServer(options, app);
server.listen(port);

const wsserver = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});
/*

wsserver.on('request', function(request) {
    try {
        var connection = request.accepts();
    } catch (e){
        console.error('error on ws connection accept', JSON.stringify(e, null, '\t'));
    }
});
*/

wsserver.on('connect', function(wsc) {
    WebSocketService.addSession(wsc);
});

wsserver.on('close', function(wsc, reason, desc) {
    WebSocketService.removeSession(wsc);
});

server.on('error', (error) => {

    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};