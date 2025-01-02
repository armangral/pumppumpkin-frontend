import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { logoutUser } from "src/services/apiAuth";

export function useAdminLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return { logout, isLoading };
}
