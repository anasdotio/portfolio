// Dependency-free baseline JPEG encoder (ITU-T T.81): used to turn the
// 6.4MB project screenshot into a web-sized photo. Run:
//   node tools/jpegenc.mjs <src.png> <dest.jpg> [quality]
import zlib from "node:zlib";
import fs from "node:fs";
import { decode } from "./pngtool.mjs";

const ZIGZAG = [
  0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5,
  12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28,
  35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51,
  58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63,
];

const QUANT_LUMA = [
  16, 11, 10, 16, 24, 40, 51, 61,
  12, 12, 14, 19, 26, 58, 60, 55,
  14, 13, 16, 24, 40, 57, 69, 56,
  14, 17, 22, 29, 51, 87, 80, 62,
  18, 22, 37, 56, 68, 109, 103, 77,
  24, 35, 55, 64, 81, 104, 113, 92,
  49, 64, 78, 87, 103, 121, 120, 101,
  72, 92, 95, 98, 112, 100, 103, 99,
];

const QUANT_CHROMA = [
  17, 18, 24, 47, 99, 99, 99, 99,
  18, 21, 26, 66, 99, 99, 99, 99,
  24, 26, 56, 99, 99, 99, 99, 99,
  47, 66, 99, 99, 99, 99, 99, 99,
  99, 99, 99, 99, 99, 99, 99, 99,
  99, 99, 99, 99, 99, 99, 99, 99,
  99, 99, 99, 99, 99, 99, 99, 99,
  99, 99, 99, 99, 99, 99, 99, 99,
];

const DC_LUMA_BITS = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
const DC_LUMA_VALS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DC_CHROMA_BITS = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
const DC_CHROMA_VALS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const AC_LUMA_BITS = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d];
const AC_LUMA_VALS = [
  0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06,
  0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08,
  0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0, 0x24, 0x33, 0x62, 0x72,
  0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28,
  0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45,
  0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59,
  0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75,
  0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89,
  0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3,
  0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6,
  0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9,
  0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2,
  0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4,
  0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa,
];

const AC_CHROMA_BITS = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 0x77];
const AC_CHROMA_VALS = [
  0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31, 0x06, 0x12, 0x41,
  0x51, 0x07, 0x61, 0x71, 0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91,
  0xa1, 0xb1, 0xc1, 0x09, 0x23, 0x33, 0x52, 0xf0, 0x15, 0x62, 0x72, 0xd1,
  0x0a, 0x16, 0x24, 0x34, 0xe1, 0x25, 0xf1, 0x17, 0x18, 0x19, 0x1a, 0x26,
  0x27, 0x28, 0x29, 0x2a, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44,
  0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58,
  0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74,
  0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87,
  0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a,
  0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4,
  0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7,
  0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda,
  0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf2, 0xf3, 0xf4,
  0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa,
];

function buildHuffTable(bits, vals) {
  // maps symbol -> {code, length}
  const table = new Map();
  let code = 0;
  let k = 0;
  for (let len = 1; len <= 16; len++) {
    for (let i = 0; i < bits[len]; i++) {
      table.set(vals[k++], { code, length: len });
      code++;
    }
    code <<= 1;
  }
  return table;
}

function scaleQuant(base, quality) {
  const q = Math.max(1, Math.min(100, quality));
  const factor = q < 50 ? Math.floor(5000 / q) : 200 - q * 2;
  return base.map((v) => {
    const scaled = Math.floor((v * factor + 50) / 100);
    return Math.max(1, Math.min(255, scaled));
  });
}

// Precomputed orthonormal cosine basis for the 8x8 FDCT.
// The 1/4 * C(u) * C(v) normalisation is folded in so the output coefficients
// match the JPEG spec directly and can be divided by the quant tables as-is.
const normC = (k) => (k === 0 ? 1 / Math.SQRT2 : 1);
const COSU = Array.from({ length: 8 }, (_, u) =>
  Array.from({ length: 8 }, (_, x) =>
    0.5 * normC(u) * Math.cos(((2 * x + 1) * u * Math.PI) / 16),
  ),
);
const COSV = Array.from({ length: 8 }, (_, v) =>
  Array.from({ length: 8 }, (_, y) =>
    0.5 * normC(v) * Math.cos(((2 * y + 1) * v * Math.PI) / 16),
  ),
);

function fdct(block) {
  // 2D separable FDCT
  const tmp = new Float64Array(64);
  for (let y = 0; y < 8; y++) {
    for (let u = 0; u < 8; u++) {
      let s = 0;
      for (let x = 0; x < 8; x++) s += block[y * 8 + x] * COSU[u][x];
      tmp[y * 8 + u] = s;
    }
  }
  const out = new Float64Array(64);
  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      let s = 0;
      for (let y = 0; y < 8; y++) s += tmp[y * 8 + u] * COSV[v][y];
      out[v * 8 + u] = s;
    }
  }
  return out;
}

class BitWriter {
  constructor() {
    this.bytes = [];
    this.acc = 0;
    this.bitCount = 0;
  }
  write(code, length) {
    for (let i = length - 1; i >= 0; i--) {
      this.acc = (this.acc << 1) | ((code >> i) & 1);
      this.bitCount++;
      if (this.bitCount === 8) {
        const b = this.acc & 0xff;
        this.bytes.push(b);
        if (b === 0xff) this.bytes.push(0x00); // byte stuffing
        this.acc = 0;
        this.bitCount = 0;
      }
    }
  }
  flush() {
    while (this.bitCount !== 0) this.write(1, 1); // pad with 1s
  }
  toBuffer() {
    return Buffer.from(this.bytes);
  }
}

function categoryOf(value) {
  let abs = Math.abs(value);
  let bits = 0;
  while (abs > 0) {
    bits++;
    abs >>= 1;
  }
  return bits;
}

// Encode a coefficient, returning the value to add to the DC predictor.
function encodeBlock(bw, coeffs, quant, dcTable, acTable, prevDC) {
  const quantized = new Int32Array(64);
  for (let i = 0; i < 64; i++) {
    quantized[i] = Math.round(coeffs[i] / quant[i]);
  }

  // DC: differential
  const dc = quantized[0];
  const diff = dc - prevDC;
  const dcCat = categoryOf(diff);
  const dcCode = dcTable.get(dcCat);
  if (!dcCode) throw new Error(`missing DC code for category ${dcCat}`);
  bw.write(dcCode.code, dcCode.length);
  if (dcCat > 0) {
    const v = diff < 0 ? diff + (1 << dcCat) - 1 : diff;
    bw.write(v, dcCat);
  }

  // AC: run-length of zeros + huffman symbol
  let run = 0;
  for (let k = 1; k < 64; k++) {
    const val = quantized[ZIGZAG[k]];
    if (val === 0) {
      run++;
      continue;
    }
    while (run > 15) {
      const zrl = acTable.get(0xf0);
      bw.write(zrl.code, zrl.length);
      run -= 16;
    }
    const cat = categoryOf(val);
    const sym = (run << 4) | cat;
    const code = acTable.get(sym);
    if (!code) throw new Error(`missing AC code for symbol 0x${sym.toString(16)}`);
    bw.write(code.code, code.length);
    const v = val < 0 ? val + (1 << cat) - 1 : val;
    bw.write(v, cat);
    run = 0;
  }
  if (run > 0) {
    const eob = acTable.get(0x00);
    bw.write(eob.code, eob.length);
  }
  return dc;
}

function toYCbCr(r, g, b) {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const cb = -0.168736 * r - 0.331264 * g + 0.5 * b + 128;
  const cr = 0.5 * r - 0.418688 * g - 0.081312 * b + 128;
  return [y, cb, cr];
}

export function encodeJPEG(width, height, rgb, quality = 82) {
  const qLuma = scaleQuant(QUANT_LUMA, quality);
  const qChroma = scaleQuant(QUANT_CHROMA, quality);
  const dcLuma = buildHuffTable(DC_LUMA_BITS, DC_LUMA_VALS);
  const dcChroma = buildHuffTable(DC_CHROMA_BITS, DC_CHROMA_VALS);
  const acLuma = buildHuffTable(AC_LUMA_BITS, AC_LUMA_VALS);
  const acChroma = buildHuffTable(AC_CHROMA_BITS, AC_CHROMA_VALS);

  // Full-resolution Y, half-resolution Cb/Cr (4:2:0)
  const Y = new Float64Array(width * height);
  const Cb = new Float64Array(
    Math.ceil(width / 2) * Math.ceil(height / 2),
  );
  const Cr = new Float64Array(
    Math.ceil(width / 2) * Math.ceil(height / 2),
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const [yy, cb, cr] = toYCbCr(rgb[i], rgb[i + 1], rgb[i + 2]);
      Y[y * width + x] = yy - 128;
      Cb[(y >> 1) * Math.ceil(width / 2) + (x >> 1)] += cb - 128;
      Cr[(y >> 1) * Math.ceil(width / 2) + (x >> 1)] += cr - 128;
    }
  }
  // average the 2x2 chroma samples
  const cw = Math.ceil(width / 2);
  const ch = Math.ceil(height / 2);
  for (let i = 0; i < cw * ch; i++) {
    Cb[i] /= 4;
    Cr[i] /= 4;
  }

  const bw = new BitWriter();
  let prevY = 0, prevCb = 0, prevCr = 0;

  const mcuW = 16, mcuH = 16;
  const mcusX = Math.ceil(width / mcuW);
  const mcusY = Math.ceil(height / mcuH);

  const lumaBlock = new Float64Array(64);
  const chromaBlock = new Float64Array(64);

  for (let my = 0; my < mcusY; my++) {
    for (let mx = 0; mx < mcusX; mx++) {
      // 4 luma blocks
      for (let by = 0; by < 2; by++) {
        for (let bx = 0; bx < 2; bx++) {
          for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
              const px = Math.min(width - 1, mx * 16 + bx * 8 + x);
              const py = Math.min(height - 1, my * 16 + by * 8 + y);
              lumaBlock[y * 8 + x] = Y[py * width + px];
            }
          }
          prevY = encodeBlock(
            bw, fdct(lumaBlock), qLuma, dcLuma, acLuma, prevY,
          );
        }
      }
      // 1 chroma block each
      for (let c = 0; c < 2; c++) {
        const plane = c === 0 ? Cb : Cr;
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            const px = Math.min(cw - 1, mx * 8 + x);
            const py = Math.min(ch - 1, my * 8 + y);
            chromaBlock[y * 8 + x] = plane[py * cw + px];
          }
        }
        const coeffs = fdct(chromaBlock);
        if (c === 0) {
          prevCb = encodeBlock(
            bw, coeffs, qChroma, dcChroma, acChroma, prevCb,
          );
        } else {
          prevCr = encodeBlock(
            bw, coeffs, qChroma, dcChroma, acChroma, prevCr,
          );
        }
      }
    }
  }
  bw.flush();

  // ---- assemble file ----
  const out = [];
  const marker = (code) => {
    out.push(Buffer.from([0xff, code]));
  };
  const u16 = (v) => {
    const b = Buffer.alloc(2);
    b.writeUInt16BE(v);
    out.push(b);
  };

  marker(0xd8); // SOI

  // APP0/JFIF
  marker(0xe0);
  u16(16);
  out.push(Buffer.from("JFIF\0", "ascii"));
  out.push(Buffer.from([1, 1, 0, 0, 1, 0, 1, 0, 0]));

  // DQT (both tables in one segment) — must be serialised in ZIGZAG order
  const dqt = [];
  for (const [id, table] of [[0, qLuma], [1, qChroma]]) {
    dqt.push(id);
    for (const z of ZIGZAG) dqt.push(table[z]);
  }
  marker(0xdb);
  u16(dqt.length + 2);
  out.push(Buffer.from(dqt));

  // SOF0 — 4:2:0 (luma 2x2, chroma 1x1) so a 16x16 MCU holds 4 luma blocks
  // and 1 block of each chroma plane.
  marker(0xc0);
  u16(8 + 3 * 3);
  out.push(Buffer.from([8]));
  u16(height);
  u16(width);
  out.push(Buffer.from([3]));
  out.push(Buffer.from([1, 0x22, 0]));
  out.push(Buffer.from([2, 0x11, 1]));
  out.push(Buffer.from([3, 0x11, 1]));

  // DHT
  const dht = [];
  const addTable = (cls, id, bits, vals) => {
    dht.push((cls << 4) | id);
    for (let i = 1; i <= 16; i++) dht.push(bits[i]);
    for (const v of vals) dht.push(v);
  };
  addTable(0, 0, DC_LUMA_BITS, DC_LUMA_VALS);
  addTable(1, 0, AC_LUMA_BITS, AC_LUMA_VALS);
  addTable(0, 1, DC_CHROMA_BITS, DC_CHROMA_VALS);
  addTable(1, 1, AC_CHROMA_BITS, AC_CHROMA_VALS);
  marker(0xc4);
  u16(dht.length + 2);
  out.push(Buffer.from(dht));

  // SOS
  marker(0xda);
  u16(6 + 2 * 3);
  out.push(Buffer.from([3]));
  out.push(Buffer.from([1, 0x00, 2, 0x11, 3, 0x11]));
  out.push(Buffer.from([0, 63, 0]));

  out.push(bw.toBuffer());

  marker(0xd9); // EOI

  return Buffer.concat(out);
}

if (process.argv[1] && process.argv[1].endsWith("jpegenc.mjs")) {
  const [, , src, dest, quality] = process.argv;
  const img = decode(fs.readFileSync(src));
  const rgb = Buffer.alloc(img.width * img.height * 3);
  for (let i = 0, o = 0; i < img.data.length; i += img.channels, o += 3) {
    rgb[o] = img.data[i];
    rgb[o + 1] = img.data[i + 1];
    rgb[o + 2] = img.data[i + 2];
  }
  const jpg = encodeJPEG(img.width, img.height, rgb, Number(quality) || 82);
  fs.writeFileSync(dest, jpg);
  console.log(
    `${src} -> ${dest}  ${img.width}x${img.height}  ${(jpg.length / 1024).toFixed(0)}KB`,
  );
}
