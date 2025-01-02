import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApproveReferral } from "src/services/apiAdmin";

export function useApproveReferral() {
  const queryClient = useQueryClient();
  const { mutate: approvereferral, isPending } = useMutation({
    mutationFn: ApproveReferral,
    onSuccess: () => {
      toast.success("Referral successfully Approved");
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, approvereferral };
}
