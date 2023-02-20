import puppeteer, { Browser } from "puppeteer";

const getBrowserInstance = async () => {
  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
    headless: true,
    ignoreHTTPSErrors: true,
  });
};

let browser: Promise<Browser> | null = null;

export const createImage = async (html: string) => {
  const width = 400;
  const height = 550;
  const pixelDensity = 2;

  try {
    if (!browser) {
      console.log("Starting browser instance");
      browser = getBrowserInstance();
    }

    console.log("Rendering");
    const start = Date.now();
    const page = await (await browser).newPage();
    try {
      await page.setViewport({
        width,
        height,
        deviceScaleFactor: pixelDensity,
      });

      await page.setContent(html);
      await page.waitForNetworkIdle();
      await page.waitForFunction("window.renderComplete === true");

      const png = await page.screenshot({ type: "png" });
      const jpg = await page.screenshot({ type: "jpeg" });
      console.log("Took", Date.now() - start, "ms to render images");

      return { png, jpg };
    } finally {
      await page.close();
    }
  } finally {
    if (browser != null) {
      // await browser.close();
    }
  }
};
