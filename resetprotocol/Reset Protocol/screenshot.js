const puppeteer = require('puppeteer');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const FILE_URL = `file://${path.join(__dirname, 'index.html')}`;

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(FILE_URL, { waitUntil: 'networkidle0' });

    // Wait for hero animation to finish
    await new Promise(r => setTimeout(r, 4000));

    // Full page
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${vp.name}-full.png`),
      fullPage: true,
    });

    // Above the fold
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${vp.name}-hero.png`),
    });

    console.log(`✓ ${vp.name} (${vp.width}x${vp.height})`);
  }

  await browser.close();
  console.log(`\nScreenshots saved to ${SCREENSHOTS_DIR}`);
})();
