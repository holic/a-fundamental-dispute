import PQueue from "p-queue";

import { createImage } from "./createImage";

const queue = new PQueue({ concurrency: 1 });

export const queueImage = async (html: string) => {
  return queue.add(() => createImage(html), { throwOnTimeout: true });
};
