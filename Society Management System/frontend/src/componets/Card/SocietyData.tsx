import {
  Building,
  Building2,
  DoorOpen,
  Hammer,
  HandCoins,
  ShieldAlert,
  User2,
} from "lucide-react";

export const cards = () => [
  {
    icon: <Building2 className="text-orange-500" />,
    percentage: "+12%",
    title: "TOTAL Buildings",
    value: "120",
  },
  {
    icon: <Building2 className="text-blue-500" />,
    percentage: "+8.4%",
    title: "TOTAL Flats",
    value: "420",
  },
  {
    icon: <User2 className="text-green-400" />,
    percentage: "+15%",
    title: "TOTAL Resident",
    value: "0000",
  },
  {
    icon: <HandCoins className="text-yellow-400" />,
    percentage: "+15%",
    title: "Monthly Collection",
    value: "3",
  },
  {
    icon: <ShieldAlert className="text-red-500" />,
    percentage: "+15%",
    title: "Total Complaints",
    value: "12",
  },
];

export type BuildingCardProps = {
  icon: React.ReactNode;
  percentage: string;
  title: string;
  value: string;
};

export const buildingCards = (
  totalBuildings: number,
  totalFloors: number,
  totalFlats: number,
): BuildingCardProps[] => [
  {
    icon: <Building2 className="text-orange-500" />,
    percentage: "+3%",
    title: "Total Buildings",
    value: totalBuildings?.toString(),
  },
  {
    icon: <Building className="text-blue-500" />,
    percentage: "+8%",
    title: "Total Floors",
    value: totalFloors?.toString(),
  },
  {
    icon: <DoorOpen className="text-green-500" />,
    percentage: "+12%",
    title: "Total Flats",
    value: totalFlats?.toString(),
  },
  {
    icon: <Hammer className="text-yellow-500" />,
    percentage: "5 Active",
    title: "Under Renovation",
    value: "5",
  },
];
