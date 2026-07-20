// One-shot OG image generator: renders the brand card with headless Chromium → public/og.png
// Run: node scripts/generate-og.mjs   (requires chromium at /opt/pw-browsers/chromium or CHROME_PATH)
import { chromium } from 'playwright-core';

const html = `<!doctype html><html><head><style>
  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#F7F7F5; color:#111318;
         font-family:Arial, Helvetica, sans-serif; padding:72px; display:flex;
         flex-direction:column; justify-content:space-between; }
  .kicker { font-family:'Courier New', monospace; font-weight:bold; letter-spacing:.2em;
            text-transform:uppercase; color:#1D4ED8; font-size:22px; }
  h1 { font-size:64px; line-height:1.12; letter-spacing:-1px; max-width:900px; margin-top:28px; }
  h1 span { background:linear-gradient(transparent 58%, rgba(255,194,75,.75) 58%); }
  .brand { font-family:'Courier New', monospace; font-weight:bold; font-size:28px; }
  .brand span { color:#1D4ED8; }
  svg.curve { position:absolute; right:0; bottom:0; width:640px; height:320px; opacity:.9; }
</style></head><body>
  <div>
    <div class="kicker">Seven Figures Lab</div>
    <h1>We find the exact spend level where your next dollar <span>stops making money.</span></h1>
  </div>
  <div class="brand">sevenfigureslab<span>.com</span></div>
  <svg class="curve" viewBox="0 0 640 320">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A6BF5" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#2A6BF5" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="M 0 300 C 140 280, 240 150, 360 100 C 460 60, 560 48, 640 44 L 640 320 L 0 320 Z" fill="url(#g)"/>
    <path d="M 0 300 C 140 280, 240 150, 360 100 C 460 60, 560 48, 640 44" fill="none" stroke="#2A6BF5" stroke-width="5" stroke-linecap="round"/>
    <line x1="420" y1="80" x2="420" y2="320" stroke="#1D4ED8" stroke-opacity=".55" stroke-width="2" stroke-dasharray="6 7"/>
    <circle cx="420" cy="80" r="8" fill="#F7F7F5" stroke="#1D4ED8" stroke-width="5"/>
  </svg>
</body></html>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium',
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png written');
