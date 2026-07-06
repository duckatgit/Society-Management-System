import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouce, type updatePayload } from "../API/GetService";

export const useUpdateAnnounce = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updatePayload }) =>
      updateAnnouce(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAnnounce"],
      });
    },
  });
};
