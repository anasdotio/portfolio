// Minimal dependency-free PNG decode/resize/encode, used to trim the
// 6.4MB project screenshot and the 581KB profile cutout down to web-sized
// assets. Run: node tools/pngtool.mjs <command> ...
import zlib from "node:zlib";
import fs from "node:fs";

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function readChunks(buf) {
  let off = 8;
  const chunks = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    chunks.push({ type, data });
    off += 12 + len;
  }
  return chunks;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

export function decode(buf) {
  if (!buf.subarray(0, 8).equals(SIG)) throw new Error("not a png");
  const chunks = readChunks(buf);
  const ihdr = chunks.find((c) => c.type === "IHDR").data;
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const bitDepth = ihdr[8];
  const colorType = ihdr[9];
  const interlace = ihdr[12];

  if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
  if (interlace !== 0) throw new Error("interlaced png unsupported");
  if (colorType !== 6 && colorType !== 2) {
    throw new Error(`unsupported color type ${colorType}`);
  }
  const channels = colorType === 6 ? 4 : 3;

  const idat = Buffer.concat(
    chunks.filter((c) => c.type === "IDAT").map((c) => c.data),
  );
  const raw = zlib.inflateSync(idat);

  const stride = width * channels;
  const out = Buffer.alloc(height * stride);

  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= channels ? prev[x - channels] : 0;
      const v = line[x];
      switch (filter) {
        case 0: cur[x] = v; break;
        case 1: cur[x] = (v + a) & 255; break;
        case 2: cur[x] = (v + b) & 255; break;
        case 3: cur[x] = (v + ((a + b) >> 1)) & 255; break;
        case 4: cur[x] = (v + paeth(a, b, c)) & 255; break;
        default: throw new Error(`bad filter ${filter}`);
      }
    }
  }
  return { width, height, channels, data: out };
}

// Box-filter downscale (good enough for screenshots; fast and artifact-free).
export function resize(img, targetW) {
  const { width, height, channels, data } = img;
  const scale = targetW / width;
  const targetH = Math.max(1, Math.round(height * scale));
  const out = Buffer.alloc(targetW * targetH * channels);
  const xRatio = width / targetW;
  const yRatio = height / targetH;

  for (let y = 0; y < targetH; y++) {
    const y0 = Math.floor(y * yRatio);
    const y1 = Math.min(height, Math.max(y0 + 1, Math.floor((y + 1) * yRatio)));
    for (let x = 0; x < targetW; x++) {
      const x0 = Math.floor(x * xRatio);
      const x1 = Math.min(width, Math.max(x0 + 1, Math.floor((x + 1) * xRatio)));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * width + xx) * channels;
          r += data[i]; g += data[i + 1]; b += data[i + 2];
          a += channels === 4 ? data[i + 3] : 255;
          n++;
        }
      }
      const o = (y * targetW + x) * channels;
      out[o] = Math.round(r / n);
      out[o + 1] = Math.round(g / n);
      out[o + 2] = Math.round(b / n);
      if (channels === 4) out[o + 3] = Math.round(a / n);
    }
  }
  return { width: targetW, height: targetH, channels, data: out };
}

// Flatten alpha onto a solid backdrop, then drop to RGB (smaller payload).
function flatten(img, bg) {
  const { width, height, channels, data } = img;
  if (channels !== 4) return img;
  const out = Buffer.alloc(width * height * 3);
  for (let i = 0, o = 0; i < data.length; i += 4, o += 3) {
    const a = data[i + 3] / 255;
    out[o] = Math.round(data[i] * a + bg[0] * (1 - a));
    out[o + 1] = Math.round(data[i + 1] * a + bg[1] * (1 - a));
    out[o + 2] = Math.round(data[i + 2] * a + bg[2] * (1 - a));
  }
  return { width, height, channels: 3, data: out };
}

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

// Filter a scanline with the given PNG filter type, in place.
function filterLine(type, cur, prev, stride, bpp) {
  const out = Buffer.alloc(stride);
  for (let x = 0; x < stride; x++) {
    const a = x >= bpp ? cur[x - bpp] : 0;
    const b = prev ? prev[x] : 0;
    const c = prev && x >= bpp ? prev[x - bpp] : 0;
    const v = cur[x];
    switch (type) {
      case 0: out[x] = v; break;
      case 1: out[x] = (v - a) & 255; break;
      case 2: out[x] = (v - b) & 255; break;
      case 3: out[x] = (v - ((a + b) >> 1)) & 255; break;
      case 4: out[x] = (v - paeth(a, b, c)) & 255; break;
    }
  }
  return out;
}

// Choose the filter type per scanline using the standard minimum-sum-of-
// absolute-differences heuristic. This is lossless and typically cuts a
// photographic PNG by 50-70% versus using filter 0 everywhere.
function filterImage(img) {
  const { width, height, channels, data } = img;
  const stride = width * channels;
  const bpp = channels;
  const raw = Buffer.alloc(height * (stride + 1));
  let prev = null;

  for (let y = 0; y < height; y++) {
    const cur = data.subarray(y * stride, (y + 1) * stride);
    let bestType = 0;
    let bestSum = Infinity;
    let bestBuf = null;
    for (let type = 0; type < 5; type++) {
      const buf = filterLine(type, cur, prev, stride, bpp);
      let sum = 0;
      for (let i = 0; i < stride; i++) {
        const s = buf[i] < 128 ? buf[i] : 256 - buf[i];
        sum += s < 255 ? s : 255;
      }
      if (sum < bestSum) {
        bestSum = sum;
        bestType = type;
        bestBuf = buf;
      }
    }
    raw[y * (stride + 1)] = bestType;
    bestBuf.copy(raw, y * (stride + 1) + 1);
    prev = cur;
  }
  return raw;
}

export function encode(img) {
  const { width, height, channels, data } = img;
  const colorType = channels === 4 ? 6 : 2;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = colorType;
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const raw = filterImage(img);

  const idat = zlib.deflateSync(raw, { level: 9, memLevel: 9 });
  return Buffer.concat([
    SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// Trim fully-transparent margins from an RGBA image (the profile cutout has
// a large transparent border that wastes bytes).
export function trimAlpha(img) {
  const { width, height, channels, data } = img;
  if (channels !== 4) return img;
  let top = height, bottom = -1, left = width, right = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  if (bottom < 0) return img;
  const nw = right - left + 1;
  const nh = bottom - top + 1;
  const out = Buffer.alloc(nw * nh * 4);
  for (let y = 0; y < nh; y++) {
    data.copy(
      out,
      y * nw * 4,
      ((y + top) * width + left) * 4,
      ((y + top) * width + right + 1) * 4,
    );
  }
  return { width: nw, height: nh, channels: 4, data: out };
}

function alphaStats(img) {
  const { width, height, channels, data } = img;
  let opaque = 0, partial = 0, clear = 0;
  for (let i = 3; i < data.length; i += channels) {
    if (data[i] > 250) opaque++;
    else if (data[i] > 8) partial++;
    else clear++;
  }
  const total = opaque + partial + clear;
  return {
    width, height, channels,
    opaquePct: +((opaque / total) * 100).toFixed(1),
    partialPct: +((partial / total) * 100).toFixed(1),
    clearPct: +((clear / total) * 100).toFixed(1),
  };
}

// Crop a region out of an image.
export function crop(img, x0, y0, w, h) {
  const ch = img.channels;
  const out = Buffer.alloc(w * h * ch);
  for (let y = 0; y < h; y++) {
    img.data.copy(
      out,
      y * w * ch,
      ((y0 + y) * img.width + x0) * ch,
      ((y0 + y) * img.width + x0 + w) * ch,
    );
  }
  return { width: w, height: h, channels: ch, data: out };
}

const [cmd, ...args] = process.argv.slice(2);

// Only run the CLI when this file is the entrypoint, so other tools can
// import { decode } without triggering a command.
if (process.argv[1] && process.argv[1].endsWith("pngtool.mjs")) {
if (cmd === "probe") {
  for (const p of args) {
    const img = decode(fs.readFileSync(p));
    console.log(p, JSON.stringify(alphaStats(img)));
  }
} else if (cmd === "trim") {
  const [src, dest, targetW] = args;
  let img = decode(fs.readFileSync(src));
  img = trimAlpha(img);
  if (targetW) img = resize(img, Number(targetW));
  fs.writeFileSync(dest, encode(img));
  console.log(`${src} -> ${dest}  ${img.width}x${img.height}  ${(fs.statSync(dest).size / 1024).toFixed(0)}KB`);
} else if (cmd === "resize") {
  const [src, dest, targetW] = args;
  let img = decode(fs.readFileSync(src));
  const cropped = Number(args[3] || 0);
  if (cropped) {
    // crop to top portion (project screenshots: keep upper area)
    const c = Math.round(img.height * cropped);
    img = { ...img, height: c, data: img.data.subarray(0, c * img.width * img.channels) };
  }
  img = resize(img, Number(targetW));
  fs.writeFileSync(dest, encode(img));
  console.log(`${src} -> ${dest}  ${img.width}x${img.height}  ${(fs.statSync(dest).size / 1024).toFixed(0)}KB`);
} else if (cmd === "flatten") {
  const [src, dest, targetW, bgHex] = args;
  let img = decode(fs.readFileSync(src));
  if (targetW) img = resize(img, Number(targetW));
  const bg = [6, 6, 15].map((v, i) => parseInt(bgHex.slice(i * 2, i * 2 + 2), 16));
  img = flatten(img, bg);
  fs.writeFileSync(dest, encode(img));
  console.log(`${src} -> ${dest}  ${img.width}x${img.height}  ${(fs.statSync(dest).size / 1024).toFixed(0)}KB`);
} else {
  console.log("usage: pngtool.mjs probe|trim|resize|flatten ...");
}
}
