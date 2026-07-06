import { Setting } from "./Setting";

export const SuperAdminSetting = () => {
  return (
    <Setting
      breadcrumb={[
        { label: "DashBoard", path: "/super-admin/dash" },
        { label: "Settings" },
      ]}
      title=" System Settings"
      description="Manage your personal profile, secure account credentials,
        and configure global system-wide environment defaults."
      showActivityButton={false}
    />
  );
};
