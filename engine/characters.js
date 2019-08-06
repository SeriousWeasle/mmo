//Dependencies
const fs = require('fs');

//Function to load a character from the characters folder
exports.loadcharacter = function(uid) {
    return JSON.parse(fs.readFileSync('./data/characters/' + uid + '.json'));
}

//Function to save a character to the characters folder
exports.savecharacter = function(uid, obj) {
    fs.writeFileSync('./data/characters/' + uid + '.json', JSON.stringify(obj));
}