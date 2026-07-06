import { Complains } from "./Complains";

export const SuperAdminComplain = () => {
  return (
    <Complains
      breadcrumb={[
        { label: "Dashboard", path: "/super-admin/dash" },
        { label: "Complains" },
      ]}
      title="Complaints"
      description="View and manage all complaints raised by residents."
      showActivityButton={false}
    />
  );
};
