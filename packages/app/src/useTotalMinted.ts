import { useContractRead } from "wagmi";

import { getContracts } from "./contracts";
import { targetChainId } from "./EthereumProviders";
import { useIsMounted } from "./useIsMounted";

const contracts = getContracts();

export const useTotalMinted = () => {
  const isMounted = useIsMounted();
  const { data } = useContractRead({
    ...contracts.AFundamentalDispute,
    chainId: targetChainId,
    functionName: "totalMinted",
    watch: true,
    enabled: isMounted,
  });
  return isMounted ? data : undefined;
};
