// useInvestorInvestmentSummary.js
import { useQuery } from "@tanstack/react-query";
import { getPPHoldingValue } from "src/services/apiInvestor";

export function usePpHoldingValue(referralcode) {
  return useQuery({
    queryKey: ["ppholdings", referralcode], // Include referralcode in queryKey
    queryFn: () => getPPHoldingValue(referralcode),
    staleTime: 2 * 60 * 1000,
    gcTime: 30 * 60 * 1000, // Using gcTime instead of deprecated cacheTime
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
    enabled: Boolean(referralcode), // Only enable when referralcode exists
  });
}
