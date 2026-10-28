import { chromium } from "@playwright/test";

const shots = "C:/Users/Eliezer/AppData/Local/Temp/opencode";
const browser = await chromium.launch();

for (const [name, vp] of [["mobile", { width: 390, height: 844 }], ["desktop", { width: 1280, height: 900 }]]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.locator("#experiencia").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const data = await page.evaluate(() => {
    const sec = document.getElementById("experiencia");
    const line = sec.querySelector("div.absolute.bottom-8");
    const nodes = [...sec.querySelectorAll('div[class*="-translate-x-1/2"]')];
    const lr = line.getBoundingClientRect();
    const lineCx = lr.left + lr.width / 2;
    return {
      lineCx: Math.round(lineCx * 10) / 10,
      nodes: nodes.map((n) => {
        const r = n.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        return { cx: Math.round(cx * 10) / 10, diff: Math.round((cx - lineCx) * 10) / 10 };
      }),
    };
  });
  console.log(name, JSON.stringify(data));
  await page.locator("#experiencia").screenshot({ path: `${shots}/timeline-${name}.png` });
  await page.close();
}
await browser.close();
