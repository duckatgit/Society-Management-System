import { useQuery } from "@tanstack/react-query";
import { getBuilding } from "../API/GetService";

export const useBuilding = () => {
  return useQuery({
    queryKey: ["getBuilding"],
    queryFn: getBuilding,
  });
};
