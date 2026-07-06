import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../API/GetService";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
