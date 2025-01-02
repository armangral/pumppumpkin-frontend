import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { WithdrawVipBalance } from "src/services/apiReferral";

export function useWithdrawVipBalance() {
  const queryClient = useQueryClient();
  const { mutate: withdrawvipbalance, isPending } = useMutation({
    mutationFn: WithdrawVipBalance,
    onSuccess: () => {
      toast.success("Withdraw request successfully submitted!");
      queryClient.invalidateQueries({ queryKey: ["earnings-summary"] });
      queryClient.invalidateQueries({ queryKey: ["vip-balance"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, withdrawvipbalance };
}
