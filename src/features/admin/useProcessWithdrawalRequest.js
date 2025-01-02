import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ProcessWithdrawalRequest } from "src/services/apiAdmin";

export function useProcessWithdrawalRequest() {
  const queryClient = useQueryClient();
  const { mutate: processwithdrawalrequest, isPending } = useMutation({
    mutationFn: ProcessWithdrawalRequest,
    onSuccess: () => {
      toast.success("Withdrawal request processed successfully!");
      queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, processwithdrawalrequest };
}
