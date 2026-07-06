import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../API/GetService";

export const useProfile = () => {
  const role = localStorage.getItem("role");
  const isAdmin = role === "super_admin" || role === "admin";
  // console.log("role hok", role);

  return useQuery({
    queryKey: ["getProfile", role],
    queryFn: getProfile,
    enabled: isAdmin,
  });
};
