#!/usr/bin/env node

(async () => {
  try {
    const ps = require('./parser');
    const puppeteer = require('puppeteer');
    const fs = require('fs');

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    class Player {
      constructor(beats_queue) {
        // bpm?
        this.beats_queue = beats_queue;
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
        setTimeout(() => { this.playBeat(); }, 1000);
      }

      async play() {
        this.browser = await puppeteer.launch({ headless: false });
        const page = await this.browser.newPage();
        await page.goto('https://bongo.cat/');
        this.keyboard = page.keyboard;

        setTimeout(() => { this.playBeat(); }, 1000);
      }
    }

    const argv = require('yargs')
      .usage('Usage: $0 <command> [options]')
      .command('read', 'Read music from file')
      .example('$0 read -f music.json', 'read music from json file')
      .alias('f', 'file')
      .nargs('f', 1)
      .describe('f', 'Load a file')
      .help('h')
      .alias('h', 'help').argv;

    const queue = new ps.BeatQueue(argv.file);
    const player = new Player(queue);
    await player.play();
  } catch (e) {
    console.log(e);
  }
})();