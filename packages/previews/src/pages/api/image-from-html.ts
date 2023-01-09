import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import chromium from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { Browser } from "puppeteer";
import type { Browser as BrowserCore } from "puppeteer-core";

import { s3Client, s3Endpoint } from "../../s3Client";

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
  if (req.body.sharedSecret !== process.env.SHARED_SECRET) {
    res.status(401).json({ error: { code: "UNAUTHORIZED" } });
    return;
  }

  const html = req.body.html as string;
  if (!html) {
    res.status(400).json({ error: { code: "MISSING_HTML" } });
    return;
  }

  const cacheKey = req.body.cacheKey as string;
  if (!html) {
    res.status(400).json({ error: { code: "MISSING_CACHE_KEY" } });
    return;
  }

  const bucketName = "afd-images";
  const imageUrl = `${s3Endpoint}/${bucketName}/${cacheKey}`;

  try {
    const headCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: cacheKey,
    });
    const headResponse = await s3Client.send(headCommand);
    if (headResponse.$metadata.httpStatusCode === 200) {
      // TODO: check if image is 0 bytes and >age and allow to regenerate
      res.json({ imageUrl, isReady: !!headResponse.ContentLength });
      return;
    }
  } catch (error) {
    // Do nothing
  }

  console.log("Creating image placeholder:", cacheKey);
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: cacheKey,
    Body: "",
    ACL: "public-read",
  });
  await s3Client.send(putCommand);

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

    console.log("Storing image:", cacheKey);
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: cacheKey,
      Body: imageBuffer,
      ACL: "public-read",
    });
    await s3Client.send(putCommand);

    res.json({ imageUrl });
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
