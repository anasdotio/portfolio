// Removes the white "sticker" outline baked into the profile cutout and
// de-fringes the antialiased edge, so the portrait composites cleanly onto
// the dark background. Run: node tools/dehalo.mjs <src.png> <dest.png> [width]
import fs from "node:fs";
import { decode, encode } from "./pngtool.mjs";

const [src, dest, widthArg] = process.argv.slice(2);

const img = decode(fs.readFileSync(src));
const { width, height, data } = img;
console.log(`source ${width}x${height}`);

const isNearWhite = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  return r > 190 && g > 190 && b > 190 && Math.max(r, g, b) - Math.min(r, g, b) <= 30;
};

// --- 1. find the largest connected component of near-white pixels ---
const whiteIdx = new Set();
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    if (data[i + 3] > 8 && isNearWhite(i)) whiteIdx.add(y * width + x);
  }
}
console.log(`near-white pixels: ${whiteIdx.size}`);

const seen = new Set();
let best = [];
for (const start of whiteIdx) {
  if (seen.has(start)) continue;
  const stack = [start];
  seen.add(start);
  const comp = [];
  while (stack.length) {
    const p = stack.pop();
    comp.push(p);
    const py = (p / width) | 0;
    const px = p % width;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = px + dx, ny = py + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const np = ny * width + nx;
        if (seen.has(np) || !whiteIdx.has(np)) continue;
        seen.add(np);
        stack.push(np);
      }
    }
  }
  if (comp.length > best.length) best = comp;
}
console.log(`largest white component: ${best.length} px (${((best.length / whiteIdx.size) * 100).toFixed(0)}% of white)`);

// --- 2. erase it ---
const removed = new Uint8Array(width * height);
for (const p of best) {
  data[p * 4 + 3] = 0;
  removed[p] = 1;
}

// --- 3. de-fringe: pull the true colour inward from the erased edge ---
// Pixels just inside the cutout edge were blended with white; replace their
// colour with an average of neighbours that are further inside.
const isEdge = new Uint8Array(width * height);
for (let p = 0; p < width * height; p++) {
  if (removed[p] || data[p * 4 + 3] < 8) continue;
  const px = p % width, py = (p / width) | 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = px + dx, ny = py + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (removed[ny * width + nx]) { isEdge[p] = 1; break; }
    }
    if (isEdge[p]) break;
  }
}

const snapshot = Buffer.from(data);
for (let pass = 0; pass < 4; pass++) {
  const src2 = Buffer.from(snapshot);
  for (let p = 0; p < width * height; p++) {
    if (!isEdge[p]) continue;
    const px = p % width, py = (p / width) | 0;
    let r = 0, g = 0, b = 0, n = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = px + dx, ny = py + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const np = ny * width + nx;
        if (removed[np] || isEdge[np]) continue;
        const j = np * 4;
        r += src2[j]; g += src2[j + 1]; b += src2[j + 2]; n++;
      }
    }
    if (!n) continue;
    const j = p * 4;
    snapshot[j] = Math.round(r / n);
    snapshot[j + 1] = Math.round(g / n);
    snapshot[j + 2] = Math.round(b / n);
  }
  // edge pixels become interior for the next pass
  const nextEdge = new Uint8Array(width * height);
  for (let p = 0; p < width * height; p++) {
    if (removed[p]) continue;
    const px = p % width, py = (p / width) | 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = px + dx, ny = py + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const np = ny * width + nx;
        if (removed[np] || isEdge[np]) { nextEdge[p] = 1; break; }
      }
      if (nextEdge[p]) break;
    }
  }
  isEdge.set(nextEdge);
}
data.set(snapshot);

// --- 4. posterize colours slightly so zlib compresses much better ---
// Rounding each channel to a coarse step is visually lossless on a
// photograph but makes neighbouring pixels identical, which is what
// deflate actually benefits from.
const STEP = 6;
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] === 0) continue;
  data[i] = Math.round(data[i] / STEP) * STEP;
  data[i + 1] = Math.round(data[i + 1] / STEP) * STEP;
  data[i + 2] = Math.round(data[i + 2] / STEP) * STEP;
}

fs.writeFileSync(dest, encode({ width, height, channels: 4, data }));
console.log(`wrote ${dest} ${(fs.statSync(dest).size / 1024).toFixed(0)}KB`);
