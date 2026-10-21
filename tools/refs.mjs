// Capture reference sites with a real browser so their JS-rendered design
// and structure can be reviewed.
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "shots/refs";
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  { name: "manish", url: "https://manishdev.xyz" },
  { name: "pin1", url: "https://in.pinterest.com/pin/1092685928384364587/" },
  { name: "pin2", url: "https://in.pinterest.com/pin/677088125275224567/" },
  { name: "pin3", url: "https://in.pinterest.com/pin/709105903877956648/" },
];

const browser = await chromium.launch();

for (const t of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(5000);

    await page.screenshot({ path: `${OUT}/${t.name}-viewport.png` });
    await page.screenshot({
      path: `${OUT}/${t.name}-full.png`,
      fullPage: true,
    });

    // Pull the rendered structure and computed styles for design cues.
    const info = await page.evaluate(() => {
      const pick = (el, props) => {
        const s = getComputedStyle(el);
        const o = {};
        for (const p of props) o[p] = s.getPropertyValue(p);
        return o;
      };

      const body = pick(document.body, [
        "background-color",
        "color",
        "font-family",
      ]);

      const sections = [...document.querySelectorAll("section, header, main > div")]
        .slice(0, 40)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            id: el.id || "",
            cls: (el.className || "").toString().slice(0, 120),
            h: Math.round(r.height),
            text: (el.innerText || "").trim().slice(0, 160),
          };
        });

      const headings = [...document.querySelectorAll("h1,h2,h3")]
        .slice(0, 40)
        .map((el) => ({
          tag: el.tagName,
          text: (el.innerText || "").trim().slice(0, 80),
          size: getComputedStyle(el).fontSize,
          weight: getComputedStyle(el).fontWeight,
          color: getComputedStyle(el).color,
        }));

      // Colour census across visible elements
      const colors = {};
      const bgs = {};
      for (const el of document.querySelectorAll("*")) {
        const s = getComputedStyle(el);
        colors[s.color] = (colors[s.color] || 0) + 1;
        const bg = s.backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)") bgs[bg] = (bgs[bg] || 0) + 1;
      }
      const top = (o, n = 12) =>
        Object.entries(o)
          .sort((a, b) => b[1] - a[1])
          .slice(0, n);

      return {
        title: document.title,
        body,
        sections,
        headings,
        topColors: top(colors),
        topBackgrounds: top(bgs),
        bodyText: (document.body.innerText || "").slice(0, 3000),
      };
    });

    fs.writeFileSync(
      `${OUT}/${t.name}.json`,
      JSON.stringify(info, null, 2),
    );
    console.log(`\n=== ${t.name} (${t.url}) ===`);
    console.log(`title: ${info.title}`);
    console.log(`body bg: ${info.body["background-color"]}  font: ${info.body["font-family"]}`);
    console.log("headings:", JSON.stringify(info.headings.slice(0, 14), null, 1));
    console.log("top bg colors:", JSON.stringify(info.topBackgrounds));
    console.log("sections:", info.sections.length);
  } catch (err) {
    console.log(`${t.name}: FAILED ${err.message}`);
  }

  await page.close();
}

await browser.close();
