import { UserRoundPlus } from "lucide-react";
import { BuildingContent } from "./BuildingContent";
import { useNavigate } from "react-router-dom";

export const SocietyBuilding = () => {
  const navigate = useNavigate();
  return (
    <>
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
        onPrimaryClick={() => navigate("/society-admin/buildings/create")}
      />
    </>
  );
};
