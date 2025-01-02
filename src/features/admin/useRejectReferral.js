import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RejectReferral } from "src/services/apiAdmin";

export function useRejectReferral() {
  const queryClient = useQueryClient();
  const { mutate: rejectreferral, isPending } = useMutation({
    mutationFn: RejectReferral,
    onSuccess: () => {
      toast.success("Referral successfully Rejected");
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, rejectreferral };
}
