import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../API/GetService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLoginApi = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: adminLogin,

    onSuccess: (data) => {
      if (data.admin.role === "super_admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.admin.role);

        toast.success("Admin Login Successfully");

        navigate("/super-admin/dash");
      } else {
        toast.error("Access denied");
      }
    },

    onError: () => {
      toast.error("User not found");
    },
  });
};
