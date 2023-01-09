import { PutObjectCommand } from "@aws-sdk/client-s3";
import chromium from "chrome-aws-lambda";
import { Browser } from "puppeteer";
import type { Browser as BrowserCore } from "puppeteer-core";

import { s3Client } from "./s3Client";

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

let browser: Browser | BrowserCore | null = null;

export const createImage = async (cacheKey: string, html: string) => {
  const width = 400;
  const height = 550;
  const pixelDensity = 2;

  try {
    if (!browser?.isConnected()) {
      console.log("Starting browser instance");
      console.time("browser start");
      browser = await getBrowserInstance();
      console.timeEnd("browser start");
    }

    console.log("Rendering", cacheKey);
    console.time("render");
    const page = await browser.newPage();
    await page.setViewport({
      width,
      height,
      deviceScaleFactor: pixelDensity,
    });

    await page.setContent(html);
    await page.waitForNetworkIdle();
    await page.waitForFunction("window.renderComplete === true");

    const imageBuffer = await page.screenshot({ type: "png" });
    console.timeEnd("render");
    console.log("image size", imageBuffer.length / 1024 / 1024, "mb");

    const putCommand = new PutObjectCommand({
      Bucket: "afd-images",
      Key: cacheKey,
      Body: imageBuffer,
      ACL: "public-read",
      ContentType: "image/png",
    });
    s3Client.send(putCommand).then(() => console.log("Stored image", cacheKey));
  } catch (error: unknown) {
    console.error("error while generating image", error);
  } finally {
    if (browser !== null) {
      // await browser.close();
    }
  }
};
