const { chromium } = require('playwright');

const URL = "https://www.ysycompany.com/claim-benefits";

// 🌐 PROXY (HTTP AUTH)
const proxy = {
  server: "http://38.154.203.95:5863",
  username: "orzyxxuq",
  password: "s5jd613as0pq"
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

    console.log("👉 Looking for button...");

    const cta = page.locator('text=Get Access');

    if (await cta.count() > 0) {
      await cta.click();
      console.log("✅ Click success");
    } else {
      console.log("⚠️ Button not found");
    }

    await sleep(3000);

  } catch (err) {
    console.log("❌ ERROR:", err.message);
  }

  await browser.close();
}

runTest();
