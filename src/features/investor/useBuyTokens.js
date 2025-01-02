import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { BuyTokens } from "src/services/apiInvestor";

export function useBuyTokens() {
  const queryClient = useQueryClient();
  const { mutate: buytokens, isPending } = useMutation({
    mutationFn: BuyTokens,
    onSuccess: () => {
      toast.success("Tokens successfully purchased!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, buytokens };
}
