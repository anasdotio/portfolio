// Screenshot the running dev server at several viewports and scroll
// positions so the redesign can be reviewed visually.
import { chromium } from "playwright";
import fs from "node:fs";

const URL = process.env.URL || "http://127.0.0.1:5199/";
const OUT = "shots";
fs.mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Scroll the whole page so every whileInView reveal has fired before the
  // full-page capture — otherwise the lower sections render blank.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(800);

  // full page
  //
  // Playwright's fullPage capture resizes the viewport internally, which
  // re-fires every whileInView observer mid-capture and leaves the lower
  // sections blank. Growing the viewport to the full page height first
  // means every section is already on screen, so the reveal has fired and
  // the capture is honest.
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: vp.width, height: pageHeight });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: `${OUT}/${vp.name}-full.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(500);

  // above the fold
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });

  // each section
  for (const id of [
    "about",
    "skills",
    "projects",
    "process",
    "journey",
    "toolbelt",
    "contact",
  ]) {
    const el = await page.$(`#${id}`);
    if (!el) {
      errors.push(`missing section #${id}`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${vp.name}-${id}.png` });
  }

  console.log(`${vp.name}: ${errors.length ? "ERRORS" : "clean"}`);
  errors.forEach((e) => console.log(`   ! ${e}`));

  await page.close();
}

await browser.close();
console.log("done");
