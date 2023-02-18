import chromium from "chrome-aws-lambda";
import { Browser } from "puppeteer";

const getBrowserInstance = async () => {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    const puppeteer = await import("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    executablePath,
    args: chromium.args,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    // ignoreDefaultArgs: ["--disable-extensions"],
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
