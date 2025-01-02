import { useQuery } from "@tanstack/react-query";
import { getCurrentAdmin } from "../../services/apiAuth";

export function useAdmin() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["admin"],
    queryFn: getCurrentAdmin,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user ? true : false,
  };
}
