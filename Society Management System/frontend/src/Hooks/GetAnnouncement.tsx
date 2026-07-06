import { useQuery } from "@tanstack/react-query";
import { getAnnounce } from "../API/GetService";

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["getAnnounce"],
    queryFn: getAnnounce,
  });
};
