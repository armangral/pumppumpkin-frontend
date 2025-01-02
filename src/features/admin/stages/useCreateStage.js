import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CreateStage } from "src/services/apiAdmin";

export function useCreateStage() {
  const queryClient = useQueryClient();
  const { mutate: createtokenstagae, isPending } = useMutation({
    mutationFn: CreateStage,
    onSuccess: () => {
      toast.success("Stage created successfully!");
      queryClient.invalidateQueries({ queryKey: ["stages"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, createtokenstagae };
}
