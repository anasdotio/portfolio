import { chromium } from "playwright";
import fs from "node:fs";
const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:700,height:700}});
const b64 = fs.readFileSync("src/assets/profile-new.jpg").toString("base64");
await page.setContent(`<body style="margin:0;background:#ff00ff">
<img id="i" src="data:image/jpeg;base64,${b64}" style="display:block;width:700px;height:700px">
</body>`);
await page.waitForTimeout(500);
await page.screenshot({path:"shots/render-check.png"});
// also read pixels of a fresh canvas copy
const px = await page.evaluate(()=>{
  const img=document.getElementById('i');
  const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
  const ctx=c.getContext('2d'); ctx.drawImage(img,0,0);
  const d=ctx.getImageData(0,0,c.width,c.height).data;
  const at=(x,y)=>{const i=(y*c.width+x)*4;return [d[i],d[i+1],d[i+2]];};
  return {tl:at(2,2),tr:at(c.width-3,2),bl:at(2,c.height-3),br:at(c.width-3,c.height-3),topMid:at(c.width>>1,3)};
});
await browser.close();
console.log(JSON.stringify(px));
