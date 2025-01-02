import { useQuery } from "@tanstack/react-query";
import { getAdminWithdrawalRequests } from "src/services/apiAdmin";

export function useAdminWithdrawalRequests() {
  const { isLoading, data: withdrawalrequests } = useQuery({
    queryKey: ["withdrawal-requests"],
    queryFn: getAdminWithdrawalRequests,
  });

  return {
    isLoading,
    withdrawalrequests,
  };
}
