const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
const jsonParser = bodyParser.json()

const port = 3000;

app.post('/', jsonParser, async (req, res) => {
  const ps = require('./parser');
  const pl = require('./player');

  const queue = new ps.BeatQueue(req.body);
  const player = new pl.Player(queue);
  await player.play();

  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})