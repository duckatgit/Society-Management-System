import { RevenueContent } from "./RevenueContent";

export const SuperAdminRevenue = () => {
  return (
    <>
      <RevenueContent
        breadcrumb={[
          { label: "Dashboard", path: "/super-admin/dash" },
          { label: "Revenue" },
        ]}
        title="Revenue Analytics"
        description="Global financial performance and transaction monitoring."
        showActivityButton={false}
      />
    </>
  );
};
