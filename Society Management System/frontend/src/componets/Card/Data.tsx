import {
  Building,
  Building2,
  CircleCheck,
  CircleEllipsis,
  CircleX,
  HandCoins,
  MonitorPlay,
  Tickets,
  Users,
} from "lucide-react";

interface CardDataParams {
  societies: number | string;
  buildings: number | string;
  residents: number | string;
  announcements: number | string;
  tickets: number | string;
}

export interface ICardItem {
  icon: React.ReactNode;
  percentage: string;
  title: string;
  value: string;
}

export const cards = ({
  societies,
  buildings,
  residents,
  announcements,
}: CardDataParams): ICardItem[] => [
  {
    icon: <Building2 className="text-orange-500" />,
    percentage: "+12%",
    title: "TOTAL SOCIETIES",
    value: String(societies),
  },
  {
    icon: <Users className="text-blue-500" />,
    percentage: "+8.4%",
    title: "TOTAL BUILDINGS",
    value: String(buildings),
  },
  {
    icon: <HandCoins className="text-green-400" />,
    percentage: "+15%",
    title: "TOTAL RESIDENTS",
    value: String(residents),
  },
  {
    icon: <MonitorPlay className="text-yellow-400" />,
    percentage: "+15%",
    title: "ANNOUNCEMENTS",
    value: String(announcements),
  },
  {
    icon: <Tickets className="text-red-500" />,
    percentage: "+15%",
    title: "TOTAL COMPLAINTS",
    value: "0",
  },
];
//ANNOUNCEMENTS DATA

export const announce = (data) => [
  {
    icon: <Building2 className="text-orange-500" />,
    percentage: "+12%",
    title: "TOTAL ANNOUNCEMENTS",
    value: String(data?.count || 0),
  },
  {
    icon: <Users className="text-blue-500" />,
    percentage: "+8.4%",
    title: "HIGH PRIORITY",
    value: String(
      data?.data?.filter((item) => item.priority === "High").length || 0,
    ),
  },
  {
    icon: <HandCoins className="text-green-400" />,
    percentage: "+15%",
    title: "MAINTENANCE NOTICES",
    value: String(
      data?.data?.filter((item) => item.category === "Maintenance").length || 0,
    ),
  },
  {
    icon: <MonitorPlay className="text-yellow-400" />,
    percentage: "+15%",
    title: "PUBLISHED TODAY",
    value: String(
      data?.data?.filter((item) => {
        const today = new Date().toDateString();
        return new Date(item.createdAt).toDateString() === today;
      }).length ?? 0,
    ),
  },
  {
    icon: <Tickets className="text-red-500" />,
    percentage: "+15%",
    title: "TARGETED ANNOUNCEMENTS",
    value: String(
      data?.data?.filter((item) => item.sendTo?.length > 0).length || 0,
    ),
  },
];

export const revenue = (data) => [
  {
    icon: <HandCoins className="text-green-500" />,
    percentage: "+12%",
    title: "TOTAL REVENUE",
    value: `₹${data?.totalRevenue || 0}`,
  },
  {
    icon: <MonitorPlay className="text-blue-500" />,
    percentage: "+8.4%",
    title: "ACTIVE SUBSCRIPTIONS",
    value: String(data?.activeSubscriptions || 0),
  },
  {
    icon: <Building2 className="text-orange-500" />,
    percentage: "+15%",
    title: "PAYING SOCIETIES",
    value: String(data?.payingSocieties || 0),
  },
  {
    icon: <Users className="text-purple-500" />,
    percentage: "+10%",
    title: "MONTHLY COLLECTION",
    value: `₹${data?.monthlyRevenue || 0}`,
  },
  {
    icon: <Tickets className="text-red-500" />,
    percentage: "+5%",
    title: "PENDING PAYMENTS",
    value: String(data?.pendingPayments || 0),
  },
];

export interface TransactionsData {
  icon: React.ReactNode;
  title: string;
  plan: string;
  money: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

export const Transactions: TransactionsData[] = [
  {
    icon: <CircleCheck className="text-green-400" />,
    title: "Skyline Residency",
    plan: "ENTERPRISE PLAN",
    money: "$1,200.00",
    date: "Oct 24, 2025",
    status: "Completed",
  },
  {
    icon: <CircleCheck className="text-green-400" />,
    title: "Heritage Square",
    plan: "ENTERPRISE PLAN",
    money: "$1,200.00",
    date: "Aug 15, 2025",
    status: "Completed",
  },
  {
    icon: <CircleEllipsis className="text-green-400" />,
    title: "Emerald Gardens",
    plan: "STANDARD PLAN",
    money: "$1,200.00",
    date: "June 1, 2025",
    status: "Pending",
  },

  {
    icon: <CircleX className="text-red-500" />,
    title: "Mountain View ",
    plan: "STANDARD PLAN",
    money: "$450.00",
    date: "Feb 6, 2025",
    status: "Failed",
  },
];
// export const Societies: SocietiesProps[] = [
//   {
//     icon: <Building2 className="text-red-500" />,
//     name: "Skyline Residency",
//     location: "New York, NY",
//     admin: "John Wick",
//     teir: "Enterprise",
//     status: "Active",
//     action: <EllipsisVertical />,
//   },
// ];

interface SocietyCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentage: string;
}

export const getSocietyCard = (data): SocietyCardProps[] => {
  const totalSocieties = data?.count || 0;

  return [
    {
      icon: <Building2 className="text-green-500" />,
      title: "Total Societies",
      value: String(totalSocieties),
      percentage: "+12%",
    },
    {
      icon: <Building2 className="text-red-500" />,
      title: "Inactive Societies",
      value: "10",
      percentage: "-3%",
    },
    {
      icon: <Building className="text-blue-500" />,
      title: "Active Societies",
      value: String(totalSocieties), // Synced directly with payload total count
      percentage: "+8%",
    },
    {
      icon: <Building className="text-purple-500" />,
      title: "New Societies",
      value: "45",
      percentage: "+22%",
    },
  ];
};

type ResidentProps = Partial<{
  name: string;
  email: string;
  society: string;
  UnitNo: string;
  role: string;
  status: string;
}>;

export const Resident: ResidentProps[] = [
  {
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    society: "Skyline Towers",
    UnitNo: "B-1204",
    role: "Owner",
    status: "Verified",
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    society: "Green Valley Residency",
    UnitNo: "A-301",
    role: "Tenant",
    status: "Active",
  },
  {
    name: "Neha Sharma",
    email: "neha.sharma@example.com",
    society: "Palm Grove Apartments",
    UnitNo: "C-902",
    role: "Owner",
    status: "Verified",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    society: "Skyline Towers",
    UnitNo: "B-508",
    role: "Tenant",
    status: "Inactive",
  },
  {
    name: "Priya Singh",
    email: "priya.singh@example.com",
    society: "Lakeview Homes",
    UnitNo: "D-110",
    role: "Owner",
    status: "Pending",
  },
  {
    name: "Aman Gupta",
    email: "aman.gupta@example.com",
    society: "Green Valley Residency",
    UnitNo: "A-210",
    role: "Tenant",
    status: "Active",
  },
];
