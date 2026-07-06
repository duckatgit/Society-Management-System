import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResident } from "../API/GetService";

export const useDeleteResident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteResident,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getResident"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
