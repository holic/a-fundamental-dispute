import { useAccount, useQuery } from "wagmi";

export const useMintSignature = () => {
  const { address } = useAccount();

  return useQuery(["mintSignature", address], async () => {
    if (!address) {
      return null;
    }

    const response = await fetch("/api/mint-signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    const { signature } = await response.json();
    return signature;
  });
};
