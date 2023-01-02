import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { graphUrl } from "../../codegen";
import { EthereumProviders } from "../EthereumProviders";

export const graphClient = createGraphClient({
  url: graphUrl,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>A Fundamental Dispute</title>
      </Head>
      <GraphProvider value={graphClient}>
        <EthereumProviders>
          <Component {...pageProps} />
        </EthereumProviders>
      </GraphProvider>
      <ToastContainer theme="dark" position="bottom-right" draggable={false} />
    </>
  );
};

export default MyApp;
