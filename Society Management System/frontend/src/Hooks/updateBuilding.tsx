import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type updateBuilding, updateBuildings } from "../API/GetService";

export const useUpdateBuilding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateBuilding }) =>
      updateBuildings(id, data),
    onSuccess: (data) => {
      console.log("hook", data);
      queryClient.invalidateQueries({ queryKey: ["getBuilding"] });
    },
    onError: (error) => {
      console.log("hook", error);
    },
  });
};
