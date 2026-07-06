import { useNavigate } from "react-router-dom";
import MainContent from "./MainContent";
import { UserPlus } from "lucide-react";

const SuperAdminResident = () => {
  const navigate = useNavigate();

  return (
    <div className="mr-5 w-full">
      <MainContent
        breadcrumb={[
          { label: "Dashboard", path: "/super-admin/dash" },
          { label: "Residents" },
        ]}
        title="Residents"
        description="Manage all society residents in one place"
        showActivityButton={false}
        isPrimaryActive={true}
        primaryButtonIcon={<UserPlus />}
        primaryButtonText="Add Resident"
        onPrimaryClick={() => {
          navigate("/super-admin/residents/add");
        }}
      />
    </div>
  );
};

export default SuperAdminResident;
