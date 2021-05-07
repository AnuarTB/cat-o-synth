const fs = require('fs');

const ss = require("./parser.js");

let myBeats = new ss.BeatQueue('./example.json');

console.log(myBeats.head())
myBeats.next()
console.log(myBeats.head())
myBeats.next()
console.log(myBeats.head())
myBeats.next()
console.log(myBeats.head())