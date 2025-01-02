import { useQuery } from "@tanstack/react-query";
import { getVipsEarningSummary } from "src/services/apiReferral";

export function useVipsEarningsSummary() {
  const { isLoading, data: earningssummary } = useQuery({
    queryKey: ["earnings-summary"],
    queryFn: getVipsEarningSummary,
    // Keep the data fresh for 5 minutes
    staleTime: 3 * 60 * 1000,
    // Cache the data for 30 minutes
    cacheTime: 3 * 60 * 1000,
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
    earningssummary,
  };
}
