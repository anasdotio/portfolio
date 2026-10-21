// Turns the square studio portrait into a circular, background-free profile
// asset.
//
// The backdrop is a near-white studio sweep, so it is removed with a flood
// fill seeded from the image border. A flood fill (rather than a global
// colour-distance matte) is deliberate: the t-shirt under the blazer is also
// white, and it is enclosed by the blazer, so the fill can never reach it.
//
// Chromium's canvas readback mis-decodes this particular JPEG (it paints the
// backdrop white but reads it back as black, with speckles across the face),
// so the JPEG is rasterised by the browser and captured as a PNG screenshot
// instead. Every pixel operation then happens in Node.
//
//   node tools/profile-circle.mjs
import { chromium } from "playwright";
import fs from "node:fs";
import { decode, encode, resize } from "./pngtool.mjs";

const SRC = "src/assets/profile-new.jpg";
const OUT = "src/assets/profile-circle.png";
const PREVIEW = "shots/profile-circle-preview.png";
const SIZE = 560; // output diameter in px

// ---------------------------------------------------------------- 1. decode
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1400 } });
const b64 = fs.readFileSync(SRC).toString("base64");
await page.setContent(
  `<body style="margin:0;background:#fff">
     <img id="i" src="data:image/jpeg;base64,${b64}" style="display:block;width:1254px;height:1254px">
   </body>`,
);
await page.waitForTimeout(400);
const shot = await page.locator("#i").screenshot({ type: "png" });
await browser.close();

const src = decode(shot);
console.log(`source ${src.width}x${src.height}`);

const { width, height, channels, data } = src;
const at = (x, y) => (y * width + x) * channels;
const idx = (x, y) => y * width + x;

// ---------------------------------------------------- 2. locate the backdrop
// The studio sweep is white; a slight vignette makes the corners marginally
// darker, so the threshold is deliberately loose and the fill grows inwards.
const luma = (i) =>
  0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
const sat = (i) =>
  Math.max(data[i], data[i + 1], data[i + 2]) -
  Math.min(data[i], data[i + 1], data[i + 2]);

const isBackdrop = (x, y) => {
  const i = at(x, y);
  return luma(i) > 196 && sat(i) < 34;
};

const filled = new Uint8Array(width * height);
const stack = [];
const push = (x, y) => {
  const p = idx(x, y);
  if (filled[p] || !isBackdrop(x, y)) return;
  filled[p] = 1;
  stack.push(p);
};

// Seed from the top, left and right edges only. The white t-shirt touches
// the bottom edge of the frame, so seeding there would leak the fill into
// the shirt; the blazer closes off the bottom corners, so the backdrop is
// still fully reachable from the other three sides.
for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, 1);
  push(x, height - 1);
  push(x, height - 2);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(1, y);
  push(width - 1, y);
  push(width - 2, y);
}
while (stack.length) {
  const p = stack.pop();
  const x = p % width;
  const y = (p / width) | 0;
  if (x > 0) push(x - 1, y);
  if (x < width - 1) push(x + 1, y);
  if (y > 0) push(x, y - 1);
  if (y < height - 1) push(x, y + 1);
}

let filledCount = 0;
for (let p = 0; p < width * height; p++) if (filled[p]) filledCount++;
console.log(`backdrop removed: ${((filledCount / (width * height)) * 100).toFixed(1)}%`);

// --------------------------------------------- 3. grow through the soft edge
// A one-pixel band of anti-aliased pixels survives the fill. Absorb it, and
// anything else that is close enough to the backdrop to be a shadow of it.
for (let pass = 0; pass < 3; pass++) {
  const added = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = idx(x, y);
      if (filled[p]) continue;
      const i = at(x, y);
      if (luma(i) < 168 || sat(i) > 44) continue;
      let near = false;
      for (let dy = -1; dy <= 1 && !near; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (filled[idx(x + dx, y + dy)]) {
            near = true;
            break;
          }
        }
      }
      if (near) added.push(p);
    }
  }
  if (!added.length) break;
  for (const p of added) filled[p] = 1;
}

// --------------------------------------------------------- 4. build the RGBA
const out = Buffer.alloc(width * height * 4);
for (let p = 0; p < width * height; p++) {
  const i = p * channels;
  const o = p * 4;
  out[o] = data[i];
  out[o + 1] = data[i + 1];
  out[o + 2] = data[i + 2];
  out[o + 3] = filled[p] ? 0 : 255;
}
let cutout = { width, height, channels: 4, data: out };

// ------------------------------------------------------- 5. circular crop
// Frame the head and shoulders: the face is centred horizontally, and the
// crop starts just above the hairline.
const faceX = Math.round(width * 0.485);
const diameter = Math.round(width * 0.62);
const x0 = Math.max(0, Math.min(width - diameter, faceX - Math.round(diameter / 2)));
const y0 = Math.max(0, Math.round(height * 0.012));

const square = Buffer.alloc(diameter * diameter * 4);
for (let y = 0; y < diameter; y++) {
  for (let x = 0; x < diameter; x++) {
    const s = ((y0 + y) * width + (x0 + x)) * 4;
    const d = (y * diameter + x) * 4;
    square[d] = out[s];
    square[d + 1] = out[s + 1];
    square[d + 2] = out[s + 2];
    square[d + 3] = out[s + 3];
  }
}
cutout = { width: diameter, height: diameter, channels: 4, data: square };
console.log(`crop ${x0},${y0} ${diameter}x${diameter}`);

// --------------------------------------------------------- 6. circular mask
const cx = diameter / 2;
const cy = diameter / 2;
const r = diameter / 2;
for (let y = 0; y < diameter; y++) {
  for (let x = 0; x < diameter; x++) {
    const d = (y * diameter + x) * 4;
    const dist = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
    // 1.5px feather so the rim does not alias
    const a = Math.max(0, Math.min(1, (r - dist) / 1.5));
    cutout.data[d + 3] = Math.round(cutout.data[d + 3] * a);
  }
}

// ------------------------------------------------------------- 7. posterize
// Quantising the colour slightly lets deflate do much better on a photo.
const STEP = 4;
for (let i = 0; i < cutout.data.length; i += 4) {
  if (cutout.data[i + 3] === 0) continue;
  cutout.data[i] = Math.round(cutout.data[i] / STEP) * STEP;
  cutout.data[i + 1] = Math.round(cutout.data[i + 1] / STEP) * STEP;
  cutout.data[i + 2] = Math.round(cutout.data[i + 2] / STEP) * STEP;
}

if (cutout.width > SIZE) cutout = resize(cutout, SIZE);

fs.writeFileSync(OUT, encode(cutout));
console.log(
  `wrote ${OUT} ${cutout.width}x${cutout.height} ${(fs.statSync(OUT).size / 1024).toFixed(0)}KB`,
);

// -------------------------------------------------------------- 8. preview
// Composite onto the site's own background so the result can be judged.
const bg = [10, 10, 18];
const prev = Buffer.alloc(cutout.width * cutout.height * 3);
for (let p = 0; p < cutout.width * cutout.height; p++) {
  const i = p * 4;
  const a = cutout.data[i + 3] / 255;
  prev[p * 3] = Math.round(cutout.data[i] * a + bg[0] * (1 - a));
  prev[p * 3 + 1] = Math.round(cutout.data[i + 1] * a + bg[1] * (1 - a));
  prev[p * 3 + 2] = Math.round(cutout.data[i + 2] * a + bg[2] * (1 - a));
}
fs.mkdirSync("shots", { recursive: true });
fs.writeFileSync(
  PREVIEW,
  encode({ width: cutout.width, height: cutout.height, channels: 3, data: prev }),
);
console.log(`wrote ${PREVIEW}`);
