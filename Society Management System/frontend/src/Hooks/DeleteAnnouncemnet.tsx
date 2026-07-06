import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "../API/GetService";

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: (data) => {
      console.log("Deleted :", data);

      queryClient.invalidateQueries({ queryKey: ["getAnnounce"] });
    },
    onError: (error) => {
      console.log("Mutation hook error:", error);
    },
  });
};
