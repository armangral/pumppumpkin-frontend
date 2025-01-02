import { useQuery } from "@tanstack/react-query";
import { getAdminTotalSales } from "src/services/apiAdmin";

export function useAdminTotalsales() {
  const { isLoading, data: admintotalsales } = useQuery({
    queryKey: ["admin-totalsales"],
    queryFn: getAdminTotalSales,
  });

  return {
    isLoading,
    admintotalsales,
  };
}
