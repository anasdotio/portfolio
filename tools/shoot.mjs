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

  // full page
  await page.screenshot({
    path: `${OUT}/${vp.name}-full.png`,
    fullPage: true,
  });

  // above the fold
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });

  // each section
  for (const id of ["about", "skills", "projects", "journey", "contact"]) {
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
