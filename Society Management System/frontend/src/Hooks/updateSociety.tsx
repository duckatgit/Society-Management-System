import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSocieties, type updateSociety } from "../API/GetService";

export const useUpdateSociety = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateSociety }) =>
      updateSocieties(id, data),
    onSuccess: (data) => {
      console.log("hook", data);

      queryClient.invalidateQueries({ queryKey: ["societies"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
