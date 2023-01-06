import { useContractRead } from "wagmi";

import { AFundamentalDisputeAbi } from "./abi/AFundamentalDispute";
import { contracts } from "./contracts";
import { targetChainId } from "./EthereumProviders";
import { useIsMounted } from "./useIsMounted";

export const useTotalMinted = () => {
  const isMounted = useIsMounted();
  const { data } = useContractRead({
    chainId: targetChainId,
    address: contracts.AFundamentalDispute,
    abi: AFundamentalDisputeAbi,
    functionName: "totalMinted",
    watch: true,
    enabled: isMounted,
  });
  return isMounted ? data : undefined;
};
