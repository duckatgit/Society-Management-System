import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wrench,
  Megaphone,
  Ticket,
  Settings,
  Building,
  Home,
  WavesHorizontal,
} from "lucide-react";

export const societyAdminMenu = [
  {
    label: "Dashboard",
    path: "/society-admin/dash",
    icon: LayoutDashboard,
  },
  {
    label: "Buildings",
    path: "/society-admin/buildings",
    icon: Building,
  },
  {
    label: "Flats",
    path: "/society-admin/flats",
    icon: Home,
  },
  {
    label: "Residents",
    path: "/society-admin/residents",
    icon: Users,
  },

  {
    label: "Amenity",
    path: "/society-admin/Amenity",
    icon: WavesHorizontal,
  },
  {
    label: "Visitors",
    path: "/society-admin/visitors",
    icon: UserCheck,
  },
  {
    label: "Maintenance",
    path: "/society-admin/maintenance",
    icon: Wrench,
  },
  {
    label: "Announcements",
    path: "/society-admin/announcements",
    icon: Megaphone,
  },
  {
    label: "Complaints",
    path: "/society-admin/complaints",
    icon: Ticket,
  },
  {
    label: "Settings",
    path: "/society-admin/settings",
    icon: Settings,
  },
];
