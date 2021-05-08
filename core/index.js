const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://bongo.cat/');
  await page.keyboard.down('0');
  await sleep(2000);
  await page.keyboard.down('1');
  await sleep(2000);
  await browser.close();
})();