import { UserRoundPlus, Megaphone } from "lucide-react";
import { DashboardContent } from "./DashboardContent";

export const SocietyDasboard = () => {
  return (
    <>
      <DashboardContent
        title="Society Dashboard"
        description="Daily operational overview for SunRise Residency
        Residency"
        primaryButtonText="Add Resident"
        activityButtonText="Post Announcement"
        showActivityButton={true}
        activityButtonIcon={<Megaphone size={18} />}
        primaryButtonIcon={<UserRoundPlus size={18} />}
      />
    </>
  );
};
