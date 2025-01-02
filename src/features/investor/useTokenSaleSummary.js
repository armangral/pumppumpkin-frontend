import { useQuery } from "@tanstack/react-query";
import { getUserTokenSaleSummary } from "src/services/apiInvestor";

export function useTokenSaleSummary() {
  const { isLoading, data: tokensalesummary } = useQuery({
    queryKey: ["token-sale-summary"],
    queryFn: getUserTokenSaleSummary,
    // Keep the data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Cache the data for 30 minutes
    cacheTime: 5 * 60 * 1000,
    // Prevent background refetching while the window is focused
    refetchOnWindowFocus: false,
    // Don't automatically refetch on mount
    refetchOnMount: false,
    // Keep previous data while fetching new data
    keepPreviousData: true,
    // Enable the query by default
    enabled: true,
  });

  return {
    isLoading,
    tokensalesummary,
  };
}
