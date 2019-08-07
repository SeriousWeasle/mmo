const fs = require('fs');
const characters = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-=!@#$%^&()";

exports.generateUID = function (existing) {
    //Make a UID
    var exists = true;
    while (exists == true) {
        var uid = '';
        for(i = 0; i < 32; i++){
            uid = uid + characters[Math.floor(characters.length*Math.random())];
        }
        //Does it exist?
        if(existing[uid] != true) {
            //If it exists, do it again
            exists = false;
            return uid;
        }
        //give the UID to the function it called
    }
}

exports.storeUIDs = function(uids) {
    fs.writeFileSync('./data/uids.json', JSON.stringify(uids));
}

exports.loadUIDs = function() {
    return JSON.parse(fs.readFileSync('./data/uids.json'));
}