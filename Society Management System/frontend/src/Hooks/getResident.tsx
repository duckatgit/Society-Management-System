import { useQuery } from "@tanstack/react-query";
import { getResident } from "../API/GetService";

export const useGetResident = () => {
  return useQuery({
    queryKey: ["getResident"],
    queryFn: getResident,
  });
};
