const MAX_BARS = 10;

class BeatQueue {
    constructor(music_obj) {
        console.log(music_obj);

        this.beats = music_obj["notes"];
        this.bpm = music_obj["bpm"];
        // current bar and subbeat
        this.bar = 0;
        this.subbeat = 0;
        this.move();
    }

    check_bar() {
        return this.beats.hasOwnProperty(this.bar)
    }

    check_subbeat() {
        return this.beats[this.bar].hasOwnProperty(this.subbeat.toString())
    }

    move() {
        if (this.bar == MAX_BARS)
            return;

        if (!this.check_bar()) {
            this.bar++;
            this.subbeat = 0;
            this.move();
            return;
        }

        while (this.subbeat < 16 && !this.check_subbeat()) {
            this.subbeat++;
        }

        if (this.subbeat == 16) {
            this.bar++;
            this.subbeat = 0;
            this.move();
        }
    }

    head() {
        if (!this.check_bar() || !this.check_subbeat())
            return null;

        return [this.bar, this.subbeat, this.beats[this.bar][this.subbeat.toString()]]
    }

    next() {
        this.subbeat++;

        this.move();
    }
}

module.exports.BeatQueue = BeatQueue;