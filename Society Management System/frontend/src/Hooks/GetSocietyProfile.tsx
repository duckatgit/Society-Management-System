import { useQuery } from "@tanstack/react-query";
import { societyAdmin } from "../API/GetService";
export const useSocietyProfile = () => {
  const role = localStorage.getItem("role");

  return useQuery({
    queryKey: ["getSocietyProfile", role],
    queryFn: societyAdmin,
    enabled: role === "society_admin",
  });
};
