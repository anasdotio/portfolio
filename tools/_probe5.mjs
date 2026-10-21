import { chromium } from "playwright";
import fs from "node:fs";
import { decode } from "./pngtool.mjs";
const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:1254,height:1254}, deviceScaleFactor:1});
const b64 = fs.readFileSync("src/assets/profile-new.jpg").toString("base64");
await page.setContent(`<body style="margin:0;background:#000">
<img id="i" src="data:image/jpeg;base64,${b64}" style="display:block;width:1254px;height:1254px">
</body>`);
await page.waitForTimeout(500);
const shot = await page.screenshot({type:"png", clip:{x:0,y:0,width:1254,height:1254}});
await browser.close();
fs.writeFileSync("shots/raw-page.png", shot);
const img = decode(shot);
console.log("size", img.width, img.height, "channels", img.channels);
const at=(x,y)=>{const i=(y*img.width+x)*img.channels;return [img.data[i],img.data[i+1],img.data[i+2]];};
const luma=(p)=>0.299*p[0]+0.587*p[1]+0.114*p[2];
const sat=(p)=>Math.max(...p)-Math.min(...p);
const show=(label,x,y)=>{const p=at(x,y);console.log(label.padEnd(14),p,"luma",luma(p).toFixed(0),"sat",sat(p));};
show("bg TL",20,20); show("bg TM",627,20); show("bg L",20,600); show("bg R",1233,600); show("bg BL",20,1233);
show("forehead",607,250); show("nose",627,300); show("hair",627,100);
