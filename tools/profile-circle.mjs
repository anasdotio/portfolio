// Turns the square studio portrait into a circular, background-free profile
// asset.
//
// Chromium renders the source photo correctly on screen but reports the
// studio backdrop as near-black through getImageData(), so the matte is built
// from "near-black" rather than "near-white". The subject is far brighter
// than that (skin sits around 190-250, the blazer around 30-66, the hair
// around 20-25), so a flood fill seeded from the border through near-black
// pixels separates the backdrop without touching the subject.
//
// A flood fill is deliberate rather than a global colour-distance matte: the
// white t-shirt under the blazer is also light, and it is enclosed by the
// blazer, so the fill can never reach it.
//
//   node tools/profile-circle.mjs
import { chromium } from "playwright";
import fs from "node:fs";

const SRC = "src/assets/profile-new.jpg";
const OUT = "src/assets/profile-circle.png";
const PREVIEW = "shots/profile-circle-preview.png";
const SIZE = 560; // output diameter in px

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1300, height: 1300 } });
const b64 = fs.readFileSync(SRC).toString("base64");
await page.setContent(
  `<body style="margin:0"><img id="i" src="data:image/jpeg;base64,${b64}"></body>`,
);

const result = await page.evaluate(async (SIZE) => {
  const img = document.getElementById("i");
  await img.decode();
  const W = img.naturalWidth;
  const H = img.naturalHeight;

  const src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  const sctx = src.getContext("2d", { willReadFrequently: true });
  sctx.drawImage(img, 0, 0);
  const data = sctx.getImageData(0, 0, W, H).data;

  // ---- 1. matte the studio backdrop ------------------------------------
  const CH = 4;
  const at = (x, y) => (y * W + x) * CH;
  // Near-black: the backdrop. The subject's darkest tone (hair) sits at ~25.
  const isBackdrop = (x, y) => {
    const i = at(x, y);
    return (
      data[i] <= 14 && data[i + 1] <= 14 && data[i + 2] <= 14
    );
  };

  const filled = new Uint8Array(W * H);
  const stack = [];
  const push = (x, y) => {
    const p = y * W + x;
    if (filled[p] || !isBackdrop(x, y)) return;
    filled[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W;
    const y = (p / W) | 0;
    if (x > 0) push(x - 1, y);
    if (x < W - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < H - 1) push(x, y + 1);
  }
  let filledCount = 0;
  for (let p = 0; p < W * H; p++) if (filled[p]) filledCount++;

  // Absorb the anti-aliased band where the subject meets the backdrop.
  for (let pass = 0; pass < 2; pass++) {
    const added = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const p = y * W + x;
        if (filled[p]) continue;
        const i = at(x, y);
        if (data[i] > 40 || data[i + 1] > 40 || data[i + 2] > 40) continue;
        let near = false;
        for (let dy = -1; dy <= 1 && !near; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (filled[(y + dy) * W + (x + dx)]) {
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

  // ---- 2. build the cutout ---------------------------------------------
  const cut = document.createElement("canvas");
  cut.width = W;
  cut.height = H;
  const cctx = cut.getContext("2d");
  const cutData = cctx.createImageData(W, H);
  for (let p = 0; p < W * H; p++) {
    const i = p * CH;
    cutData.data[i] = data[i];
    cutData.data[i + 1] = data[i + 1];
    cutData.data[i + 2] = data[i + 2];
    cutData.data[i + 3] = filled[p] ? 0 : 255;
  }
  cctx.putImageData(cutData, 0, 0);

  // ---- 3. crop to head + shoulders, then mask to a circle ---------------
  const faceX = Math.round(W * 0.487);
  const diameter = Math.round(W * 0.62);
  const sx = Math.max(0, Math.min(W - diameter, faceX - Math.round(diameter / 2)));
  const sy = Math.max(0, Math.round(H * 0.012));

  const out = document.createElement("canvas");
  out.width = SIZE;
  out.height = SIZE;
  const octx = out.getContext("2d");
  octx.imageSmoothingQuality = "high";
  const r = SIZE / 2;
  octx.save();
  octx.beginPath();
  octx.arc(r, r, r, 0, Math.PI * 2);
  octx.clip();
  octx.drawImage(cut, sx, sy, diameter, diameter, 0, 0, SIZE, SIZE);
  octx.restore();

  // ---- 4. preview on the site's own background -------------------------
  const prev = document.createElement("canvas");
  prev.width = SIZE;
  prev.height = SIZE;
  const pctx = prev.getContext("2d");
  pctx.fillStyle = "#0a0a12";
  pctx.fillRect(0, 0, SIZE, SIZE);
  pctx.drawImage(out, 0, 0);

  return {
    W,
    H,
    filledPct: +((filledCount / (W * H)) * 100).toFixed(1),
    png: out.toDataURL("image/png"),
    preview: prev.toDataURL("image/png"),
  };
}, SIZE);

await browser.close();

const write = (path, dataUrl) => {
  fs.mkdirSync(path.split("/").slice(0, -1).join("/"), { recursive: true });
  fs.writeFileSync(path, Buffer.from(dataUrl.split(",")[1], "base64"));
};
write(OUT, result.png);
write(PREVIEW, result.preview);

console.log(`source ${result.W}x${result.H}`);
console.log(`backdrop removed: ${result.filledPct}%`);
console.log(
  `wrote ${OUT} ${SIZE}x${SIZE} ${(fs.statSync(OUT).size / 1024).toFixed(0)}KB`,
);
