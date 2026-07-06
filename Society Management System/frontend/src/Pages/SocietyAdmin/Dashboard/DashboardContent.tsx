import {
  ChevronRight,
  Megaphone,
  Users2,
  WavesHorizontal,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Card from "../../../componets/Card/Card";
import { cards } from "../../../componets/Card/SocietyData";
import PageHeader from "../../../componets/layout/PageHeader";
import { Transactions } from "../../../componets/Card/Data";
import SectionCard from "../../../componets/Card/SectionCrad";

const complaints = [
  {
    id: 1,
    name: "Bldg B, P2",
    subject: "Water Leakage",
    category: "Maintenance",
    priority: "High",
    status: "Open",
    date: "Jun 28",
  },
  {
    id: 2,
    name: "Bldg A, North",
    subject: "Elevator #4",
    category: "Facility",
    priority: "Medium",
    status: "In-Progress",
    date: "Jun 29",
  },
  {
    id: 3,
    name: "Amenities, F1",
    subject: "Clubhouse Lights",
    category: "Electrical",
    priority: "Low",
    status: "Resolved",
    date: "Jun 27",
  },
];

type ContentProps = React.ComponentProps<typeof PageHeader>;

export const DashboardContent = (props: ContentProps) => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-8">
      <PageHeader {...props} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-6 mt-6">
        {cards().map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-4 sm:px-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Recent Complaints
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Overview of active and resolved issues
              </p>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-5">Location</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {complaints.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-4 px-5 font-medium text-gray-900">
                      {c.name}
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-normal">
                      {c.subject}
                    </td>
                    <td className="py-4 px-4 text-gray-500 hidden sm:table-cell">
                      {c.category}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                          c.priority === "High"
                            ? "bg-red-50 text-red-700 border border-red-100"
                            : c.priority === "Medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        }`}
                      >
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          c.status === "Open"
                            ? "text-blue-600"
                            : c.status === "In-Progress"
                              ? "text-amber-600"
                              : "text-gray-500"
                        }`}
                      >
                        {c.status === "Open" && <AlertCircle size={12} />}
                        {c.status === "In-Progress" && <Clock size={12} />}
                        {c.status === "Resolved" && <CheckCircle2 size={12} />}
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right text-gray-400 text-xs font-medium">
                      {c.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold text-gray-900">
                Quick Actions
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Frequently used management tools
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  icon: WavesHorizontal,
                  bg: "bg-orange-50 group-hover:bg-orange-100/80",
                  color: "text-orange-600",
                  label: "Amenity Bookings",
                  desc: "Reserve slots and spaces",
                },
                {
                  icon: Users2,
                  bg: "bg-emerald-50 group-hover:bg-emerald-100/80",
                  color: "text-emerald-600",
                  label: "Visitors Today",
                  desc: "Log entries & check invites",
                },
                {
                  icon: Megaphone,
                  bg: "bg-blue-50 group-hover:bg-blue-100/80",
                  color: "text-blue-600",
                  label: "Announcements",
                  desc: "Broadcast info to society",
                },
              ].map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-gray-50/60 hover:bg-gray-50 border border-gray-100 hover:border-gray-200/80 rounded-xl transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg transition-colors ${action.bg}`}
                    >
                      <action.icon className={action.color} size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 font-normal">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl border mt-4 border-gray-100 ml-5 shadow-sm p-3.5 mr-0 lg:mr-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Transactions
            </h2>
          </div>
          <button className="text-orange-500 text-xs font-semibold hover:text-orange-600 transition cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-2">
          {Transactions.map((transaction) => (
            <SectionCard key={transaction.title} {...transaction} />
          ))}
        </div>

        {/* Compact Pagination Bar */}
        <div className="flex justify-center items-center gap-1.5 mt-4">
          <button className="px-2 py-1 text-[11px] font-medium border border-gray-200 rounded-md text-gray-600 hover:bg-orange-500 hover:text-white transition cursor-pointer">
            Prev
          </button>

          <button className="w-7 h-7 text-[11px] font-medium rounded-md bg-orange-500 text-white flex items-center justify-center transition cursor-pointer">
            1
          </button>
          <button className="w-7 h-7 text-[11px] font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white flex items-center justify-center transition cursor-pointer">
            2
          </button>
          <button className="w-7 h-7 text-[11px] font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white flex items-center justify-center transition cursor-pointer">
            3
          </button>

          <button className="px-2 py-1 text-[11px] font-medium border border-gray-200 rounded-md text-gray-600 hover:bg-orange-500 hover:text-white transition cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
