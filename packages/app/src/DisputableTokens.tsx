import { BigNumber } from "ethers";
import Link from "next/link";
import { toast } from "react-toastify";
import { gql } from "urql";
import { useAccount, useContractWrite } from "wagmi";

import { useDisputableTokensQuery } from "../codegen/indexer";
import { maxSupply } from "./constants";
import { contracts } from "./contracts";
import { PendingIcon } from "./PendingIcon";

gql`
  query DisputableTokens($owner: ID!) {
    tokens: aFundamentalDisputeTokens(where: { owner: $owner }) {
      id
      tokenId
    }
  }
`;

type Props = {
  address: string;
  lastDispute: number;
};

export const DisputableTokens = ({ address, lastDispute }: Props) => {
  const [result] = useDisputableTokensQuery({
    variables: { owner: address as string },
    pause: !address,
  });

  const { writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...contracts.AFundamentalDispute,
    functionName: "dispute",
  });

  if (result.error) {
    return <p>Error: {result.error.message}</p>;
  }

  if (!result.data) {
    return <PendingIcon />;
  }

  const tokens = result.data.tokens;
  if (!tokens.length) {
    return <p>There is nothing to dispute…</p>;
  }

  return (
    <div className="flex flex-wrap gap-12">
      {tokens.map((token) => (
        <div key={token.id} className="grid relative">
          <img
            src={`/api/art-placeholder/${token.tokenId}`}
            width="200"
            height="275"
            className="row-start-1 col-start-1 bg-stone-900"
          />
          <button
            className="row-start-1 col-start-1 bg-stone-900/80 sm:opacity-0 sm:hover:opacity-100 transition"
            onClick={async (event) => {
              event.preventDefault();
              const toastId = toast.loading("Thinking…");
              try {
                if (!writeAsync) {
                  throw new Error("Not connected");
                }

                // TODO: finish this
                const { signature } = await fetch("/api/dispute-signature", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    address,
                    tokenId: token.tokenId,
                    lastDispute,
                  }),
                }).then(
                  (res) => res.json() as Promise<{ signature: `0x${string}` }>
                );
                toast.update(toastId, { render: "Disputing…" });

                const tx = await writeAsync({
                  recklesslySetUnpreparedArgs: [
                    BigNumber.from(token.tokenId),
                    signature,
                  ],
                });
                toast.update(toastId, { render: "Awaiting reply…" });

                const receipt = await tx.wait();
                toast.update(toastId, {
                  isLoading: false,
                  type: "success",
                  render: (
                    <>
                      Your piece has fundamental changed.{" "}
                      <Link href={`/art/${token.tokenId.toString()}`}>
                        <a
                          className="underline"
                          onClick={() => toast.dismiss()}
                        >
                          View your piece &rarr;
                        </a>
                      </Link>
                    </>
                  ),
                  autoClose: 15000,
                  closeButton: true,
                });
              } catch (error: any) {
                toast.update(toastId, {
                  isLoading: false,
                  type: "error",
                  render: String(error.message),
                  autoClose: 15000,
                  closeButton: true,
                });
              }
            }}
          >
            <span className="text-white bg-amber-800 px-4 py-2">Dispute</span>
          </button>
          <span className="absolute bottom-full right-0 text-sm leading-relaxed">
            {token.tokenId}/{maxSupply}
          </span>
        </div>
      ))}
    </div>
  );
};
