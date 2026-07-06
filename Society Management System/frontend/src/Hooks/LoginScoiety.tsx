import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../API/GetService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSocietyLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userLogin,

    onSuccess: (data) => {
      const userRole = data?.admin?.role || data?.user?.role;

      if (userRole === "society_admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", userRole);

        toast.success("Society Admin Login Successfully");
        navigate("/society-admin/dash");
      } else {
        toast.error("Access denied: Not a society admin");
      }
    },

    onError: () => {
      toast.error("User not found");
    },
  });
};
