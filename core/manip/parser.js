const fs = require('fs')

const MAX_BARS = 10;

class BeatQueue {
    constructor(beats) {
        this.beats = beats;

        // current bar and subbeat
        this.bar = 0;
        this.subbeat = 0;
        this.move();
    }

    move() {
        if (this.bar == MAX_BARS) {
            return;
        }

        while (this.subbeat < 16 && !this.beats[this.bar].hasOwnProperty(this.subbeat.toString())) {
            this.subbeat++;
        }
        
        if (this.subbeat == 16) {
            this.bar++;
            this.subbeat = 0;
            this.move();
        }
    }

    head() {
        if (!this.beats.hasOwnProperty(this.bar))
            return null;
        
        if (!this.beats[this.bar].hasOwnProperty(this.subbeat.toString()))
            return null;
        
        return [this.bar, this.subbeat, this.beats[this.bar][this.subbeat.toString()]]
    }

    next() {
        this.subbeat++;
        
        this.move();
    }
}


fs.readFile('./example.json', 'utf8', (err, beats) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    let myBeats = new BeatQueue(JSON.parse(beats))

    console.log(myBeats.head())
    myBeats.next()
    console.log(myBeats.head())
    myBeats.next()
    console.log(myBeats.head())
})