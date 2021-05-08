const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Player {
  constructor(beats_queue, bpm) {
    // bpm?
    this.beats_queue = beats_queue;
    this.bpm = bpm;
    this.interval_ms = 15000.0 / this.bpm;
    this.bar = 0;
    this.subbeat = 0;
    this.keyboard = null;
    this.timer = null;
    this.browser = null;
  }

  inc() {
    this.subbeat++;
    if(this.subbeat == 16) {
      this.subbeat = 0;
      this.bar++;
    }
  }

  async playBeat() {
    debugger
    let bar, subbeat, notes, head;
    head = this.beats_queue.head();
    if(!head){
      await sleep(2000);
      await this.browser.close();
      return;
    }
    [bar, subbeat, notes] = head;
    if(this.bar == bar && this.subbeat == subbeat) {
      for(let note of notes) {
        await this.keyboard.press(note);
      }
      this.beats_queue.next();
    }

    // Move to the next subbeat
    this.inc();
    setTimeout(() => { this.playBeat(); }, this.interval_ms);
  }

  async play() {
    this.browser = await puppeteer.launch({ headless: false });
    const page = await this.browser.newPage();
    await page.goto('https://bongo.cat/');
    this.keyboard = page.keyboard;

    setTimeout(() => { this.playBeat(); }, this.interval_ms);
  }
}

module.exports.Player = Player;