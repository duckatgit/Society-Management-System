import { UserRoundPlus } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { BuildingContent } from "./BuildingContent";

export const SuperAdminBuilding = () => {
  const navigate = useNavigate();
  return (
    <div className="mr-5">
      <BuildingContent
        breadcrumb={[
          { label: "Dashboard", path: "/society-admin/dash" },
          { label: "Buildings" },
        ]}
        title="Buildings Management"
        description="Manage infrastructure, towers, and structural assets for OmniSociety."
        primaryButtonText="Add Building"
        activityButtonText=""
        showActivityButton={false}

        primaryButtonIcon={<UserRoundPlus size={18} />}
        onPrimaryClick={() => navigate("/super-admin/buildings/create")}
      />
    </div>
  );
};
