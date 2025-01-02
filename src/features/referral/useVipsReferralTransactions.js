import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getVipsReferralTransactions } from "src/services/apiReferral";

export function useVipsReferralTransactions() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("days")
    ? 7
    : searchParams.get("days") !== "all"
    ? Number(searchParams.get("days"))
    : "all";

  const { isLoading, data: transactions } = useQuery({
    queryFn: () => getVipsReferralTransactions(numDays),
    queryKey: ["vip-transactions", `days-${numDays}`],
  });

  return { isLoading, transactions };
}
