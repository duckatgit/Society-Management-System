import { useMutation } from "@tanstack/react-query";
import { createBuilding } from "../API/GetService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateBuilding = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBuilding,
    onSuccess: () => {
      toast.success("Building created successfully!");
      navigate("/super-admin/buildings/Create/Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
