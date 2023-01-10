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

let browser: Promise<Browser> | null = null;

export const createImage = async (cacheKey: string, html: string) => {
  const width = 400;
  const height = 550;
  const pixelDensity = 2;

  try {
    if (!browser) {
      console.log("Starting browser instance");
      browser = getBrowserInstance();
    }

    console.log("Rendering", cacheKey);
    console.time(`Rendered ${cacheKey}`);
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
      console.timeEnd(`Rendered ${cacheKey}`);

      const png = await page.screenshot({ type: "png" });
      const jpg = await page.screenshot({ type: "jpeg" });

      s3Client
        .send(
          new PutObjectCommand({
            Bucket: "afd-images",
            Key: `${cacheKey}.png`,
            Body: png,
            ACL: "public-read",
            ContentType: "image/png",
          })
        )
        .then(() => {
          console.log(
            "Stored image",
            `${cacheKey}.png`,
            `(${(png.length / 1024 / 1024).toPrecision(2)} mb)`
          );
        });

      s3Client
        .send(
          new PutObjectCommand({
            Bucket: "afd-images",
            Key: `${cacheKey}.jpg`,
            Body: jpg,
            ACL: "public-read",
            ContentType: "image/jpeg",
          })
        )
        .then(() => {
          console.log(
            "Stored image",
            `${cacheKey}.jpg`,
            `(${(jpg.length / 1024 / 1024).toPrecision(2)} mb)`
          );
        });
    } finally {
      await page.close();
    }
  } catch (error: unknown) {
    console.error("error while generating image", error);
  } finally {
    if (browser != null) {
      // await browser.close();
    }
  }
};
