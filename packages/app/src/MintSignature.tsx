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

useMintSignature.subscribe((state) => {
  console.log("useMintSignature state", state);
});

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
      onSuccess={async (turnstileToken) => {
        console.log("got turnstile token", turnstileToken);
        useMintSignature.setState({
          status: "verifying",
          turnstileToken,
          mintSignature: undefined,
          error: undefined,
        });

        try {
          console.log("verifying token and creating mint signature");
          const res = await fetch("/api/mint-signature", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ address, turnstileToken }),
          });

          if (useMintSignature.getState().turnstileToken !== turnstileToken) {
            console.log("outdated response, ignoring");
            return;
          }

          if (res.headers.get("Content-Type")?.includes("application/json")) {
            const data = await res.json();
            console.log("got json response", data);

            if (data.error) {
              console.log("error response", data.error);
              useMintSignature.setState({
                status: "error",
                turnstileToken: undefined,
                mintSignature: undefined,
                error: "Could not validate mint",
              });
              return;
            }

            if (data.signature) {
              console.log("got signature", data.signature);
              useMintSignature.setState({
                status: "success",
                turnstileToken,
                mintSignature: data.signature,
                error: undefined,
              });
              return;
            }

            console.error("unexpected json response", data);
            throw new Error("unexpected json response");
          }

          console.error(
            "unexpected response when generating mint signature",
            res.status,
            res.statusText
          );
          throw new Error("unexpected response");
        } catch (error: any) {
          console.error(error);
          useMintSignature.setState({
            status: "error",
            turnstileToken: undefined,
            mintSignature: undefined,
            error: "Could not validate mint",
          });
        }
      }}
      onError={() => {
        console.error("error creating turnstile token");
        useMintSignature.setState({
          status: "error",
          turnstileToken: undefined,
          mintSignature: undefined,
          error: "Could not verify browser",
        });
      }}
    />
  );
};
