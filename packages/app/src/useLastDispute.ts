import { useBlockNumber, useContractRead } from "wagmi";

import { disputeCooldown } from "./constants";
import { contracts } from "./contracts";
import { useIsMounted } from "./useIsMounted";

export const useLastDispute = () => {
  const isMounted = useIsMounted();
  const { data: currentBlock } = useBlockNumber({
    watch: true,
    enabled: isMounted,
  });
  const { data: lastDispute } = useContractRead({
    ...contracts.AFundamentalDispute,
    functionName: "lastDispute",
    watch: true,
    enabled: isMounted,
  });
  const { data: disputes } = useContractRead({
    ...contracts.AFundamentalDispute,
    functionName: "disputes",
    watch: true,
    enabled: isMounted,
  });

  const lastDisputeBlock = lastDispute?.toNumber();
  const disputesLeft = disputes?.toNumber();
  const canDispute =
    currentBlock &&
    lastDisputeBlock &&
    currentBlock > lastDisputeBlock + disputeCooldown
      ? true
      : false;
  const blocksUntilNextDispute =
    currentBlock && lastDisputeBlock
      ? lastDisputeBlock + disputeCooldown - currentBlock
      : undefined;
  return {
    currentBlock,
    lastDisputeBlock,
    canDispute,
    disputesLeft,
    blocksUntilNextDispute,
  };
};
