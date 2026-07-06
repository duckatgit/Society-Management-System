import { CirclePlus } from "lucide-react";
import { Content } from "./Content";
import { useNavigate } from "react-router-dom";

export const Announcement = () => {
  const navigate = useNavigate();
  return (
    <>
      <Content
        breadcrumb={[
          { label: "Dashboard", path: "/super-admin/dash" },
          { label: "Announcement" },
        ]}
        title="System Announcements"
        description="Manage global broadcasts and critical notifications across the OmniSociety ecosystem."
        primaryButtonIcon={<CirclePlus />}
        primaryButtonText="Create Announcements"
        showActivityButton={false}
        onPrimaryClick={() => navigate("/super-admin/Announcement/Create")}
      />
    </>
  );
};
