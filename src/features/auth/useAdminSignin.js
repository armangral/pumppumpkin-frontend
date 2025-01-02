import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLogin as loginApi } from "src/services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useAdminSignin() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (user) => {
      //setting data manually in react query cache(user is complete session obj so we will do user.user to get user)
      queryclient.setQueryData(["user"], user.user);
      navigate("/admin/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signin, isPending };
}