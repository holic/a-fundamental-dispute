import goerliDeploys from "@web3-scaffold/contracts/deploys/goerli.json";

import { generateImages } from "./generateImages";

generateImages(
  // "http://localhost:42069/graphql",
  "https://afd-ponder.up.railway.app/graphql",
  goerliDeploys.AFDRenderer.contractAddress
);
