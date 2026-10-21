import { chromium } from "playwright";
import fs from "node:fs";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent("<body><canvas id='c'></canvas></body>");
const dataUrl = "data:image/jpeg;base64," + fs.readFileSync("src/assets/profile-new.jpg").toString("base64");
const out = await page.evaluate(async (dataUrl) => {
  const img = new Image(); img.src = dataUrl; await img.decode();
  const c = document.getElementById('c'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext('2d', {willReadFrequently:true});
  ctx.drawImage(img,0,0);
  const d = ctx.getImageData(0,0,c.width,c.height).data;
  const at=(x,y)=>{const i=(y*c.width+x)*4;return [d[i],d[i+1],d[i+2],d[i+3]];};
  return {
    size:[c.width,c.height],
    tl: at(2,2), tr: at(c.width-3,2), bl: at(2,c.height-3), br: at(c.width-3,c.height-3),
    midTop: at(c.width>>1,3), midBot: at(c.width>>1,c.height-3),
    leftMid: at(3,c.height>>1), rightMid: at(c.width-3,c.height>>1),
    // opaque PNG round-trip so the file reader sees the true pixels
    png: (()=>{const o=document.createElement('canvas');o.width=c.width;o.height=c.height;const octx=o.getContext('2d');octx.drawImage(c,0,0);return o.toDataURL('image/png');})(),
  };
}, dataUrl);
await browser.close();
console.log(JSON.stringify({size:out.size,tl:out.tl,tr:out.tr,bl:out.bl,br:out.br,midTop:out.midTop,midBot:out.midBot,leftMid:out.leftMid,rightMid:out.rightMid}));
fs.writeFileSync("shots/src-opaque.png", Buffer.from(out.png.split(",")[1],"base64"));
