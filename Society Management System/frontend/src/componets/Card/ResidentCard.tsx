import { User, UserCheck, UserX, Home } from "lucide-react";

interface ResidentCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentage: string;
}

export const getResidentCard = (data): ResidentCardProps[] => {
  const totalResidents = data?.count || 0;

  const activeResidents =
    data?.data?.filter((res) => res.isActive)?.length || 0;

  const tenants =
    data?.data?.filter((res) => res.role === "tenant")?.length || 0;

  const owners = data?.data?.filter((res) => res.role === "owner")?.length || 0;

  return [
    {
      icon: <User className="text-blue-500" />,
      title: "Total Residents",
      value: String(totalResidents),
      percentage: "+10%",
    },
    {
      icon: <UserCheck className="text-green-500" />,
      title: "Active Residents",
      value: String(activeResidents),
      percentage: "+6%",
    },

    {
      icon: <Home className="text-purple-500" />,
      title: "Tenants",
      value: String(tenants),
      percentage: "+15%",
    },
    {
      icon: <UserCheck className="text-orange-500" />,
      title: "Owners",
      value: String(owners),
      percentage: "+9%",
    },
  ];
};
