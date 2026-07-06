import { useMutation } from "@tanstack/react-query";
import {
  resetPassword,
  type ResetPayload,
  type ResetMessage,
} from "../API/GetService";

const useResetApi = () => {
  return useMutation<
    ResetMessage,
    Error,
    { token: string; data: ResetPayload }
  >({
    mutationFn: ({ token, data }) => resetPassword(token, data),

    onSuccess: (data) => {
      console.log(data.message);
    },

    onError: (error) => {
      console.log("reset password error", error.message);
    },
  });
};

export default useResetApi;
