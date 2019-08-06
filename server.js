//Dependencies for webserver
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

//Self-made modules
const characters = require('./engine/characters');

//Global constants for server
const port = 5000;

//Global variables
var online = {};
var cachedcharacters = {};

//Set up express and socket.io
var app = express();
var server = http.Server(app);
var io = socketIO(server);

//Set port and static folder
app.set('port', port);
app.use('/static', express.static(__dirname + '/static'));

//Routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Start server
server.listen(port, function() {
    console.log('starting server on port ' + port);
});

//Websocket handlers
io.on('connection', function(socket) {
    socket.on('test', function() {
        console.log('received test from client socket ' + socket.id);
    });
});