// Pull the actual pin artwork out of the Pinterest page DOM (the pin image
// is present even when a login modal covers it).
import { chromium } from "playwright";
import fs from "node:fs";

const ids = [
  "1092685928384364587",
  "677088125275224567",
  "709105903877956648",
];

const OUT = "shots/refs";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  locale: "en-US",
});

for (const id of ids) {
  const page = await ctx.newPage();
  await page.goto(`https://in.pinterest.com/pin/${id}/`, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await page.waitForTimeout(4000);

  // Dismiss the login wall if it is present.
  for (const sel of [
    'button[aria-label="Close"]',
    'button[aria-label="Close modal"]',
    "[data-test-id='modal-close-button']",
  ]) {
    const el = await page.$(sel);
    if (el) {
      await el.click().catch(() => {});
      break;
    }
  }
  await page.waitForTimeout(1500);

  const title = await page.title();
  const candidates = await page.evaluate(() =>
    [...document.querySelectorAll("img")]
      .map((i) => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight }))
      .filter((i) => i.w > 400 && /pinimg|478x|564x|736x|1200x/.test(i.src))
      .sort((a, b) => b.w * b.h - a.w * a.h)
      .slice(0, 3),
  );

  console.log(`\n${id} — ${title}`);
  for (const c of candidates) console.log(`   ${c.w}x${c.h}  ${c.src.slice(0, 130)}`);

  if (candidates[0]) {
    const res = await ctx.request.get(candidates[0].src);
    const buf = await res.body();
    const file = `${OUT}/pin-${id}.jpg`;
    fs.writeFileSync(file, buf);
    console.log(`   saved ${file} (${(buf.length / 1024).toFixed(0)}KB)`);
  }

  await page.close();
}

await browser.close();
