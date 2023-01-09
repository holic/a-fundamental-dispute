import goerliDeploys from "@web3-scaffold/contracts/deploys/goerli.json";
import fs from "fs";

import { createImage } from "./createImage";

export const generateImages = async () => {
  const html = () => `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>___TOKENID___/218 &mdash; A Fundamental Dispute</title>

    <style>
      * {
        box-sizing: border-box;
      }
      html,
      body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background: #111;
      }
      canvas {
        display: block;
        margin: auto;
        width: 100% !important;
        height: 100% !important;
        object-fit: contain;
      }
    </style>

    <script>
      const seed = ${Math.floor(Math.random() * Date.now())};
    </script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js"
      integrity="sha512-WJXVjqeINVpi5XXJ2jn0BSCfp0y80IKrYh731gLRnkAS9TKc5KNt/OfLtu+fCueqdWniouJ1ubM+VI/hbo7POQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <!--<script src="http://127.0.0.1:3000/afd.js"></script>-->
    <script>${fs
      .readFileSync(`${__dirname}/../../app/public/afd.js`)
      .toString()}</script>
  `;

  const tokens = new Array(436).fill(null).map((_, i) => i + 1);
  for (const token of tokens) {
    await createImage(`test/${token}.png`, html());
  }
};

generateImages();