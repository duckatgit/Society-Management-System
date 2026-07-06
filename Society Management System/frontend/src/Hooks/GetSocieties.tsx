import { useQuery } from "@tanstack/react-query";
import { getSocieties } from "../API/GetService";

export const useGetSocieties = () => {
  return useQuery({
    queryKey: ["societies"],
    queryFn: getSocieties,
    staleTime: 0,
  });
};
