import { ArrowDownToLine } from "lucide-react";
import Content from "./Content";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <Content
      title="System Overview"
      description="Real-time performance across ecosystem"
      primaryButtonText="Revenue Report"
      showActivityButton={false}

      primaryButtonIcon={<ArrowDownToLine size={18} />}
      onPrimaryClick={() => navigate("/super-admin/Revenue")}
    />
  );
};

export default SuperAdminDashboard;
