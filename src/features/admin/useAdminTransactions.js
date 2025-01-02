import { useQuery } from "@tanstack/react-query";
import { getAdminTransactions } from "src/services/apiAdmin";

export function useAdminTransactions() {
  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAdminTransactions,
  });

  return {
    isLoading,
    transactions,
  };
}
