import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import * as allChains from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// Will default to mainnet if nothing set in the ENV
export const targetChainId =
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "0") || 1;

export const targetChain = (() => {
  const c = Object.values(allChains).find((c) => c.id === targetChainId);
  if (!c) {
    throw new Error(`No chain config found for chain ID ${targetChainId}`);
  }
  return c;
})();

// filter down to just mainnet + optional target testnet chain so that rainbowkit can tell
// the user to switch network if they're on an alternative one
const targetChains = [targetChain, allChains.mainnet];

export const { chains, provider, webSocketProvider } = configureChains(
  targetChains,
  [
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "A Fundamental Dispute",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

type Props = {
  children: React.ReactNode;
};

export const EthereumProviders = ({ children }: Props) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
