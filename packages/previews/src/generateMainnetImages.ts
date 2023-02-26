import mainnetDeploys from "@web3-scaffold/contracts/deploys/mainnet.json";

import { generateImages } from "./generateImages";

generateImages(
  "https://afd-ponder.up.railway.app/graphql",
  mainnetDeploys.AFDRenderer.contractAddress
);
