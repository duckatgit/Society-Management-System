import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScoiety } from "../API/GetService";

export const useSocietyDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScoiety,
    onSuccess: (data) => {
      console.log("Delete successful:", data);

      queryClient.invalidateQueries({ queryKey: ["societies"] });
    },
    onError: (error) => {
      console.error("Mutation hook error:", error);
    },
  });
};
