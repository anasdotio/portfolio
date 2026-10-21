// Removes the white "sticker" outline baked into the profile cutout.
//
// The outline is a white stroke sitting between the subject and the
// transparent exterior. Because it is contiguous with the alpha boundary, a
// flood fill seeded from the boundary can strip it without touching bright
// interior features (the shirt logo, eye highlights) that the outline never
// reaches.
//
//   node tools/cutout.mjs
import fs from "node:fs";
import { decode, encode, trimAlpha, crop, resize } from "./pngtool.mjs";

const SRC = "src/assets/profile.png";
const OUT = "src/assets/profile-cutout.png";
const OUT_W = 560;

const img = decode(fs.readFileSync(SRC));
console.log(`source ${img.width}x${img.height}`);

let { width, height, data } = trimAlpha(img);
console.log(`trimmed ${width}x${height}`);

const at = (x, y) => (y * width + x) * 4;
const idx = (x, y) => y * width + x;
const alphaAt = (x, y) => data[at(x, y) + 3];

// ---------------------------------------------------- 1. mark the outline
// A pixel is "whiteish" if it is bright and barely saturated.
const whiteish = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = at(x, y);
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const mn = Math.min(r, g, b);
    const mx = Math.max(r, g, b);
    whiteish[idx(x, y)] = mn > 195 && mx - mn <= 45 ? 1 : 0;
  }
}

// Seed: opaque whiteish pixels that touch the transparent exterior.
const stroke = new Uint8Array(width * height);
const stack = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (alphaAt(x, y) < 8) continue;
    if (!whiteish[idx(x, y)]) continue;
    let touchesEdge = false;
    for (let dy = -1; dy <= 1 && !touchesEdge; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (alphaAt(nx, ny) < 8) { touchesEdge = true; break; }
      }
    }
    if (touchesEdge) {
      stroke[idx(x, y)] = 1;
      stack.push(idx(x, y));
    }
  }
}

// Flood fill outward through whiteish pixels only.
while (stack.length) {
  const p = stack.pop();
  const x = p % width;
  const y = (p / width) | 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const np = idx(nx, ny);
      if (stroke[np] || !whiteish[np]) continue;
      stroke[np] = 1;
      stack.push(np);
    }
  }
}

let strokeCount = 0;
for (let p = 0; p < width * height; p++) {
  if (stroke[p]) {
    data[p * 4 + 3] = 0;
    strokeCount++;
  }
}
console.log(`removed ${strokeCount} stroke pixels`);

// --------------------------------------------- 2. de-fringe the new edge
// Pixels just inside the cutout were blended with the white stroke. Replace
// their colour with the average of the neighbours that sit deeper inside.
for (let pass = 0; pass < 6; pass++) {
  const snap = Buffer.from(data);
  const edge = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = idx(x, y);
      if (snap[p * 4 + 3] < 250) continue;

      let r = 0, g = 0, b = 0, n = 0;
      let touchesEdge = false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const np = idx(nx, ny);
          if (snap[np * 4 + 3] < 250) { touchesEdge = true; continue; }
          const j = np * 4;
          r += snap[j]; g += snap[j + 1]; b += snap[j + 2]; n++;
        }
      }
      if (touchesEdge) edge[p] = 1;
      if (!n) continue;
      const j = p * 4;
      data[j] = Math.round(r / n);
      data[j + 1] = Math.round(g / n);
      data[j + 2] = Math.round(b / n);
    }
  }
  if (pass === 5) break;
}

// ------------------------------------------------- 3. crop head + shoulders
// The source is a full-body cutout. Take a 3:4 window from the top, which
// lands on the head and upper torso.
const cropW = Math.min(width, Math.round(height * 0.62));
const cropH = Math.min(height, Math.round(cropW * (4 / 3)));
let out = crop({ width, height, channels: 4, data }, 0, 0, cropW, cropH);
out = trimAlpha(out);
console.log(`cropped ${out.width}x${out.height}`);

// ---------------------------------------------------------- 4. posterize
const STEP = 5;
for (let i = 0; i < out.data.length; i += 4) {
  if (out.data[i + 3] === 0) continue;
  out.data[i] = Math.round(out.data[i] / STEP) * STEP;
  out.data[i + 1] = Math.round(out.data[i + 1] / STEP) * STEP;
  out.data[i + 2] = Math.round(out.data[i + 2] / STEP) * STEP;
}

if (out.width > OUT_W) out = resize(out, OUT_W);

fs.writeFileSync(OUT, encode(out));
console.log(`wrote ${OUT} ${out.width}x${out.height} ${(fs.statSync(OUT).size / 1024).toFixed(0)}KB`);

// Report any remaining bright rim so the result can be verified.
let rim = 0;
for (let y = 0; y < out.height; y++) {
  for (let x = 0; x < out.width; x++) {
    const i = (y * out.width + x) * 4;
    if (out.data[i + 3] < 250) continue;
    const mn = Math.min(out.data[i], out.data[i + 1], out.data[i + 2]);
    const mx = Math.max(out.data[i], out.data[i + 1], out.data[i + 2]);
    if (mn > 195 && mx - mn <= 45) rim++;
  }
}
console.log(`remaining near-white pixels: ${rim}`);
