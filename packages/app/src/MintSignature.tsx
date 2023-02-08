import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import createStore from "zustand";

type MintSignatureState = {
  status: "loading" | "verifying" | "success" | "error";
  turnstileToken: string | undefined;
  mintSignature: string | undefined;
  error: string | undefined;
};

export const useMintSignature = createStore<MintSignatureState>(() => ({
  status: "loading",
  turnstileToken: undefined,
  mintSignature: undefined,
  error: undefined,
}));

export const MintSignature = () => {
  const { address } = useAccount();

  useEffect(() => {
    useMintSignature.setState({
      status: "loading",
      turnstileToken: undefined,
      mintSignature: undefined,
      error: undefined,
    });
  }, [address]);

  return (
    <Turnstile
      siteKey="0x4AAAAAAACZfB62LmhrgO5I"
      options={{
        size: "invisible",
        cData: address,
      }}
      onSuccess={(turnstileToken) => {
        useMintSignature.setState({
          status: "verifying",
          turnstileToken,
          mintSignature: undefined,
          error: undefined,
        });

        fetch("/api/mint-signature", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, turnstileToken }),
        })
          .then((res) => res.json())
          .then(
            (json) => {
              if (
                useMintSignature.getState().turnstileToken !== turnstileToken
              ) {
                // ignore outdated response
                return;
              }

              if (json.error) {
                useMintSignature.setState({
                  status: "error",
                  turnstileToken: undefined,
                  mintSignature: undefined,
                  error: json.error,
                });
                return;
              }

              useMintSignature.setState({
                status: "success",
                turnstileToken,
                mintSignature: json.signature,
                error: undefined,
              });
            },
            (error) => {
              if (
                useMintSignature.getState().turnstileToken !== turnstileToken
              ) {
                // ignore outdated response
                return;
              }

              useMintSignature.setState({
                status: "error",
                turnstileToken: undefined,
                mintSignature: undefined,
                error: error.message,
              });
            }
          );
      }}
      onError={() => {
        useMintSignature.setState({ status: "error" });
      }}
    />
  );
};
