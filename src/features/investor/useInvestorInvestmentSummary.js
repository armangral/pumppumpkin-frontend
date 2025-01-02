// useInvestorInvestmentSummary.js
import { useQuery } from "@tanstack/react-query";
import { getInvestorInvestmentSummary } from "src/services/apiInvestor";

export function useInvestorInvestmentSummary(walletAddress) {
  return useQuery({
    queryKey: ["investment-summary", walletAddress], // Include walletAddress in queryKey
    queryFn: () => getInvestorInvestmentSummary(walletAddress),
    staleTime: 2 * 60 * 1000,
    gcTime: 30 * 60 * 1000, // Using gcTime instead of deprecated cacheTime
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
    enabled: Boolean(walletAddress), // Only enable when walletAddress exists
  });
}
