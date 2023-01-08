import chromium from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { Browser } from "puppeteer";
import type { Browser as BrowserCore } from "puppeteer-core";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.key !== process.env.SHARED_SECRET) {
    res.status(401).json({ error: { code: "UNAUTHORIZED" } });
    return;
  }

  const html = req.body.html as string;
  if (!html) {
    res.status(400).json({ error: { code: "MISSING_HTML" } });
    return;
  }

  const width = parseInt(req.body.width as string) || 400;
  const height = parseInt(req.body.height as string) || 550;
  const pixelDensity = parseInt(req.body.pixelDensity as string) || 2;

  let browser: Browser | BrowserCore | null = null;

  try {
    browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.setViewport({
      width,
      height,
      deviceScaleFactor: pixelDensity,
    });
    page.setDefaultNavigationTimeout(1000 * 10);

    await page.setContent(html);
    await page.waitForNetworkIdle();
    await page.waitForFunction("window.renderComplete === true");

    const imageBuffer = await page.screenshot({ type: "png" });

    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error: unknown) {
    // TODO: log this to some error tracking service?
    console.error("error while generating image", error);

    res.status(500).json({
      error: {
        code: "UNEXPECTED_ERROR",
        message: (error as any).toString(),
      },
    });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

export default handler;
