import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole: "super_admin" | "society_admin";
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // console.log("role:", role);
  // console.log("allowedRole:", allowedRole);
  // console.log("token:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
