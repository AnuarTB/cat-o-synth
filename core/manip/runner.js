#!/usr/bin/env node

(async () => {
  try {
    const ps = require('./parser');
    const pl = require('./player');

    const argv = require('yargs')
      .usage('Usage: $0 <command> [options]')
      .command('read', 'Read music from file')
      .example('$0 read -f music.json', 'read music from json file')
      .option('file', {
        alias: 'f',
        type: 'string',
        description: 'JSON file of music sheet'
      })
      .option('bpm', {
        alias: 'b',
        type: 'integer',
        description: 'Beats per minute',
        default: 90
      })
      .alias('h', 'help').argv;

    const queue = new ps.BeatQueue(argv.file);
    const player = new pl.Player(queue, argv.bpm);
    await player.play();
  } catch (e) {
    console.log(e);
  }
})();