import { chromium } from "playwright";
import fs from "node:fs";
import { decode, encode } from "./pngtool.mjs";
const browser = await chromium.launch();
const page = await browser.newPage();
const b64 = fs.readFileSync("src/assets/profile-new.jpg").toString("base64");
await page.setContent(`<body><img id="i" src="data:image/jpeg;base64,${b64}"></body>`);
const png = await page.evaluate(async () => {
  const img = document.getElementById("i"); await img.decode();
  const c = document.createElement("canvas");
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  c.getContext("2d").drawImage(img, 0, 0);
  return c.toDataURL("image/png");
});
await browser.close();
const buf = Buffer.from(png.split(",")[1], "base64");
// inspect PNG header
console.log("bitDepth", buf[24], "colorType", buf[25], "interlace", buf[28], "bytes", buf.length);
const img = decode(buf);
console.log("decoded", img.width, img.height, "channels", img.channels);
// write it back out unchanged
fs.writeFileSync("shots/roundtrip.png", encode(img));
const at=(x,y)=>{const i=(y*img.width+x)*img.channels; return [img.data[i],img.data[i+1],img.data[i+2]];};
console.log("tl",at(2,2),"face",at(627,300),"forehead",at(627,220),"cheek",at(760,330));
