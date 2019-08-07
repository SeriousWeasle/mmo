//Dependencies for webserver
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

//Self-made modules
const characters = require('./engine/characters');
const uidhandler = require('./engine/uidgen');

//Global constants for server
const port = 5000;

//Global variables
var online = {};
var cachedcharacters = {};
var existingUIDs = uidhandler.loadUIDs();

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

//404 screen
app.get('*', function(req, res){
    res.status(404).send('<head><style>body {height: 98vh; background-color: black; display: flex; justify-content: center; align-items: center;}</style><title>That is an error</title><!--Princess Luna, bring me your memes, make them the dankest that I ever seen. Add in some yeets and minecraft game over. Then tell the user their bugs are over.--></head><body><img width="70%"; src="//i.imgur.com/hMfpDQ9.png"></body>');
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
    socket.on('requestUID', function(){
        newUID = uidhandler.generateUID(existingUIDs);
        existingUIDs[newUID] = true;
        io.to(socket.id).emit('uid', {'UID':newUID});
        uidhandler.storeUIDs(existingUIDs);
    });
});