import { HousePlus } from "lucide-react";
import SocietyContent from "./SocietyContent";
import { useNavigate } from "react-router-dom";

const SuperAdminSociety = () => {
  const navigate = useNavigate();
  return (
    <div className="mr-5">
      <SocietyContent
        breadcrumb={[
          { label: "Dashboard", path: "/super-admin/dash" },
          { label: "View Society" },
        ]}
        title="Societies Management"
        description="Manage all registered residential and commercial societies globally.."
        primaryButtonText="Create Society"
        showActivityButton={false}
        primaryButtonIcon={<HousePlus />}
        onPrimaryClick={() => navigate("/super-admin/Societies/Create")}
      />
    </div>
  );
};
export default SuperAdminSociety;
