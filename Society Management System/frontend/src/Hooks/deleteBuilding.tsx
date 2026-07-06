import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBuilding } from "../API/GetService";

export const useDeleteBuilding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBuilding,
    onSuccess: (data) => {
      console.log("hook", data);
      queryClient.invalidateQueries({ queryKey: ["getBuilding"] });
    },
    onError: (error) => {
      console.error("hook", error);
    },
  });
};
