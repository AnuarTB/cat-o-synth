const fs = require('fs');

const ss = require("./parser.js");

fs.readFile('./example.json', 'utf8', (err, beats) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    let myBeats = new ss.BeatQueue(JSON.parse(beats))

    console.log(myBeats.head())
    myBeats.next()
    console.log(myBeats.head())
    myBeats.next()
    console.log(myBeats.head())
    myBeats.next()
    console.log(myBeats.head())
})