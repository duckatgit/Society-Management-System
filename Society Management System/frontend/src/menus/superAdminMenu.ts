import {
  LayoutDashboard,
  Building,
  House,
  HandCoins,
  Megaphone,
  Ticket,
  Settings,
} from "lucide-react";

export const superAdminMenu = [
  {
    label: "Dashboard",
    path: "/super-admin/dash",
    icon: LayoutDashboard,
  },
  {
    label: "Societies",
    path: "/super-admin/societies",
    icon: Building,
  },
  {
    label: "Buildings",
    path: "/super-admin/Buildings",
    icon: Building,
  },
  {
    label: "Residents",
    path: "/super-admin/residents",
    icon: House,
  },
  {
    label: "Revenue",
    path: "/super-admin/revenue",
    icon: HandCoins,
  },
  {
    label: "Announcements",
    path: "/super-admin/announcement",
    icon: Megaphone,
  },
  {
    label: "Complaints",
    path: "/super-admin/complaints",
    icon: Ticket,
  },
  {
    label: "Settings",
    path: "/super-admin/settings",
    icon: Settings,
  },
];
