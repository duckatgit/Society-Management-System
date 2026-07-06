import { useMutation } from "@tanstack/react-query";
import { forgetPass } from "../API/GetService";
import { toast } from "react-toastify";

const useForgetApi = () => {
  return useMutation({
    mutationFn: forgetPass,

    onSuccess: () => {
      toast.success("Link sent to your email");
    },

    onError: () => {
      toast.error("Email not found");
    },
  });
};

export default useForgetApi;
