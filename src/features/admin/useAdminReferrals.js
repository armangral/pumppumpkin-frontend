import { useQuery } from "@tanstack/react-query";
import { getAdminReferrals } from "src/services/apiAdmin";

export function useAdminReferrals() {
  const { isLoading, data: referrals } = useQuery({
    queryKey: ["referrals"],
    queryFn: getAdminReferrals,
  });

  return {
    isLoading,
    referrals,
  };
}
