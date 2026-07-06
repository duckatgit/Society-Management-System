import { useMutation } from "@tanstack/react-query";
import { changePassword, type ChangePasswordPayload } from "../API/GetService";
import { AxiosError } from "axios";

interface ChangePasswordResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const useChangePass = () => {
  return useMutation<ChangePasswordResponse, AxiosError, ChangePasswordPayload>(
    {
      mutationFn: changePassword,

      onSuccess: (data) => {
        console.log(data.message);

        if (data.token) {
          localStorage.setItem("admin_token", data.token);
        }
      },

      onError: (error) => {
        const serverError = error.response?.data as
          | { message?: string }
          | undefined;
        console.error(
          "Password update failed:",
          serverError?.message || error.message,
        );
      },
    },
  );
};
