// Builds the hero portrait as a rectangular JPEG.
//
// The source is a full-body cutout with a baked-in white "sticker" border.
// Rather than trying to remove that border from the alpha channel, we crop a
// rectangular region out of the opaque centre of the photo — the border only
// exists in the outer margin, so a centred crop sidesteps it completely.
//
//   node tools/build-profile.mjs
import fs from "node:fs";
import { decode, crop, resize } from "./pngtool.mjs";
import { encodeJPEG } from "./jpegenc.mjs";

const SRC = "src/assets/profile.png";
const OUT = "src/assets/profile.jpg";

// Crop window in source pixels: head + shoulders, 3:4.
const CROP = { x: 59, y: 0, w: 600, h: 800 };
const OUT_W = 720;

const img = decode(fs.readFileSync(SRC));
console.log(`source ${img.width}x${img.height}`);

let out = crop(img, CROP.x, CROP.y, CROP.w, CROP.h);
console.log(`cropped ${out.width}x${out.height}`);

if (out.width > OUT_W) out = resize(out, OUT_W);

// Flatten onto the page background and drop the alpha channel.
const bg = [10, 10, 24];
const rgb = Buffer.alloc(out.width * out.height * 3);
for (let i = 0, o = 0; i < out.data.length; i += out.channels, o += 3) {
  const a = out.channels === 4 ? out.data[i + 3] / 255 : 1;
  rgb[o] = Math.round(out.data[i] * a + bg[0] * (1 - a));
  rgb[o + 1] = Math.round(out.data[i + 1] * a + bg[1] * (1 - a));
  rgb[o + 2] = Math.round(out.data[i + 2] * a + bg[2] * (1 - a));
}

const jpg = encodeJPEG(out.width, out.height, rgb, 88);
fs.writeFileSync(OUT, jpg);
console.log(`wrote ${OUT} ${out.width}x${out.height} ${(jpg.length / 1024).toFixed(0)}KB`);
