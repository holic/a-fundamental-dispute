import { useContractRead } from "wagmi";

import { getContracts } from "./contracts";
import { useIsMounted } from "./useIsMounted";

const contracts = getContracts();

export const useTotalMinted = () => {
  const isMounted = useIsMounted();
  const { data } = useContractRead({
    ...contracts.AFundamentalDispute,
    functionName: "totalMinted",
    watch: true,
    enabled: isMounted,
  });
  return isMounted ? data : undefined;
};
