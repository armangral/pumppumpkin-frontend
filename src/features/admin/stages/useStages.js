import { useQuery } from "@tanstack/react-query";
import { getStages } from "src/services/apiAdmin";

export function useStages() {
  const { isLoading, data: stages } = useQuery({
    queryKey: ["stages"],
    queryFn: getStages,
    // Keep the data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Cache the data for 30 minutes
    cacheTime: 30 * 60 * 1000,
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
    stages,
  };
}
