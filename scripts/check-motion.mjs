import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const report = await page.evaluate(() => {
  const cs = (el, prop) => getComputedStyle(el)[prop];
  const ping = document.querySelector("#contacto .animate-ping");
  const spin = document.querySelector(".spin-slow");
  const pulse = document.querySelector(".pulse-dot");
  const skel = document.querySelector(".skeleton");
  const heroOp = (() => {
    const h = document.querySelector("#top > div");
    return h ? cs(h, "opacity") + "/" + cs(h, "transform") : "n/a";
  })();
  return {
    scrollBehavior: cs(document.documentElement, "scrollBehavior"),
    pingDuration: ping ? cs(ping, "animationDuration") : "no-ping-found",
    spinAnimation: spin ? cs(spin, "animationName") : "no-spin-found",
    pulseAnimation: pulse ? cs(pulse, "animationName") : "no-pulse-found",
    skeletonAfter: skel ? cs(skel, "animationName") : "no-skeleton",
    heroVisible: heroOp,
  };
});
console.log(JSON.stringify(report, null, 2));
await page.locator("#top").screenshot({ path: "C:/Users/Eliezer/AppData/Local/Temp/opencode/motion-hero.png" });
await browser.close();
