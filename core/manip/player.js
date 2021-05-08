const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Player {
  constructor(beats_queue) {
    // bpm?
    this.beats_queue = beats_queue;
    this.bpm = beats_queue.bpm;
    this.interval_ms = 15000.0 / this.bpm;
    this.bar = 0;
    this.subbeat = 0;
    this.keyboard = null;
    this.timer = null;
    this.browser = null;
    this.last_key = null;
  }

  inc() {
    this.subbeat++;
    if(this.subbeat == 16) {
      this.subbeat = 0;
      this.bar++;
    }
  }

  async playBeat() {
    if(this.last_key) {
      await this.keyboard.up(this.last_key);
      this.last_key = null;
    }
    let bar, subbeat, notes, head;
    head = this.beats_queue.head();
    if(!head){
      await sleep(2000);
      await this.browser.close();
      return;
    }
    [bar, subbeat, notes] = head;
    if(this.bar == bar && this.subbeat == subbeat) {
      for(let i = 0; i < notes.length; i++) {
        await this.keyboard.press(notes[i]);
      }
      if (notes.length > 0) {
        await this.keyboard.down(notes[notes.length - 1]);
        this.last_key = notes[notes.length - 1];
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