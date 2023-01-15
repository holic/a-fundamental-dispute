import { useContractRead } from "wagmi";

import { contracts } from "./contracts";
import { useIsMounted } from "./useIsMounted";

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
