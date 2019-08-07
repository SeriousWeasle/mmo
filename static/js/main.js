var socket = io();

var uid;

function getUID() {
    uid = localStorage.getItem('uid');
    if (uid == null) {
        //Code to request UID from server
        socket.emit('requestUID');
    }
    
    else {
        //return UID because it is in localstorage
        return uid;
    }
}

socket.on('uid', function(data) {
    uid = data.UID;
    localStorage.setItem('uid', uid);
});

window.onload = function() {
    //stuff to happen when the game loads
    uid = getUID();
}