import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type updateResident, updateResidents } from "../API/GetService";

export const useUpadteResident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateResident }) =>
      updateResidents(id, data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getResident"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
