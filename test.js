const { chromium } = require('playwright');

const URL = "https://www.ysycompany.com/claim-benefits";

// 🌐 SOCKS5 PROXY
const proxy = {
  server: "socks5://change4.owlproxy.com:7778",
  username: "93Rblfxfj020_custom_zone_US_st__city_sid_96590445_time_30",
  password: "4837065"
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runTest() {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    proxy,
    viewport: { width: 1366, height: 768 },
    locale: "en-US"
  });

  const page = await context.newPage();

  try {
    console.log("📍 Opening page...");
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    await sleep(2000);

    console.log("👉 Looking for CTA...");

    const cta = page.locator('text=Get Access');

    if (await cta.count() > 0) {
      await cta.click();
      console.log("✅ Click success");

      // 🌀 POST CLICK ACTIVITY (30 seconds)
      console.log("🌀 Simulating post-click behavior...");

      const start = Date.now();

      while (Date.now() - start < 30000) {

        // scroll random
        await page.mouse.wheel(0, Math.floor(Math.random() * 800) + 200);

        // mouse movement random
        await page.mouse.move(
          Math.floor(Math.random() * 1200),
          Math.floor(Math.random() * 800)
        );

        // pause random
        await sleep(Math.floor(Math.random() * 1500) + 500);
      }

      console.log("✅ Post-click finished");
    } else {
      console.log("⚠️ CTA not found");
    }

    await sleep(2000);

  } catch (err) {
    console.log("❌ ERROR:", err.message);
  }

  await browser.close();
}

runTest();
