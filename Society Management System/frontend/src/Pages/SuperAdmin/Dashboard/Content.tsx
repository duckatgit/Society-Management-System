import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ChevronRight,
  Coins,
  HousePlus,
  Megaphone,
  Settings,
  UserPlus,
} from "lucide-react";

import Card from "../../../componets/Card/Card";
import SectionCard from "../../../componets/Card/SectionCrad";
import { cards, Transactions } from "../../../componets/Card/Data";
import PageHeader from "../../../componets/layout/PageHeader";

// Hooks
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useBuilding } from "../../../Hooks/GetBuilding";
import { useGetResident } from "../../../Hooks/getResident";
import { useAnnouncements } from "../../../Hooks/GetAnnouncement";

type ContentProps = React.ComponentProps<typeof PageHeader>;

const Content = (props: ContentProps) => {
  const navigate = useNavigate();

  // Data fetching hooks
  const { data: societies } = useGetSocieties();
  const { data: buildings } = useBuilding();
  const { data: residents } = useGetResident();
  const { data: announcements } = useAnnouncements();

  // Local State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Extract raw list arrays safely
  const societiesList = societies?.data || [];
  const totalItems = societiesList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice data for display matching active page index limits
  const currentSocieties = societiesList.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <PageHeader {...props} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {cards({
            societies: societies?.count || 0,
            buildings: buildings?.count || 0,
            residents: residents?.count || 0,
            announcements: announcements?.count || 0,
            tickets: 12,
          }).map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>

        {/* Dashboard Middle Layout Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent Financial Transactions Section */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 sm:p-5">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  Recent Transactions
                </h2>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Overview of latest financial activity
                </p>
              </div>
              <button className="text-orange-600 text-xs font-semibold hover:text-orange-700 hover:underline transition duration-200 cursor-pointer">
                View All
              </button>
            </div>

            <div className="space-y-1.5">
              {Transactions.map((transaction) => (
                <SectionCard key={transaction.title} {...transaction} />
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-1.5 mt-4 pt-3 border-t border-gray-100">
              <button className="px-2.5 py-1 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition cursor-pointer">
                Previous
              </button>
              <button className="w-7 h-7 text-[11px] font-semibold rounded-md bg-orange-600 text-white flex items-center justify-center shadow-sm shadow-orange-600/20">
                1
              </button>
              <button className="w-7 h-7 text-[11px] font-medium text-gray-600 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
                2
              </button>
              <button className="w-7 h-7 text-[11px] font-medium text-gray-600 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
                3
              </button>
              <button className="px-2.5 py-1 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition cursor-pointer">
                Next
              </button>
            </div>
          </div>

          {/* Quick Actions Panel Layout */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 sm:p-5 h-fit">
            <div className="mb-3">
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Quick Actions
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                System shortcuts and configurations
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => navigate("/super-admin/Societies/Create")}
                className="w-full flex items-center justify-between bg-gray-50/70 hover:bg-orange-50/60 border border-transparent hover:border-orange-100 rounded-xl p-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-white transition">
                    <HousePlus size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-950 transition">
                    Create Society
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/super-admin/buildings/Create")}
                className="w-full flex items-center justify-between bg-gray-50/70 hover:bg-blue-50/60 border border-transparent hover:border-blue-100 rounded-xl p-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-white transition">
                    <Building2 size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-950 transition">
                    Create Building
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/super-admin/residents")}
                className="w-full flex items-center justify-between bg-gray-50/70 hover:bg-purple-50/60 border border-transparent hover:border-purple-100 rounded-xl p-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-white transition">
                    <UserPlus size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-950 transition">
                    Add Resident
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/super-admin/announcement/Create")}
                className="w-full flex items-center justify-between bg-gray-50/70 hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 rounded-xl p-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-white transition">
                    <Megaphone size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-950 transition">
                    Create Announcement
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/super-admin/revenue")}
                className="w-full flex items-center justify-between bg-gray-50/70 hover:bg-amber-50/60 border border-transparent hover:border-amber-100 rounded-xl p-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-white transition">
                    <Coins size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-amber-950 transition">
                    Revenue
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center justify-between bg-gray-50/70 hover:bg-gray-100/80 border border-transparent hover:border-gray-200 rounded-xl p-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-white transition">
                    <Settings size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition">
                    Settings
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Societies Section */}
        <div className="bg-white rounded-xl shadow border border-gray-200/80 p-4 sm:p-5 mt-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Recent Societies
            </h2>
            <button
              onClick={() => navigate("/super-admin/Societies")}
              className="text-orange-500 text-sm font-medium hover:text-orange-600 transition cursor-pointer"
            >
              View More
            </button>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 rounded-xl">
                {/* Table Header Setup */}
                <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr] px-6 py-4 text-xs font-bold text-gray-700 bg-gray-50 uppercase tracking-wide border-b border-gray-200">
                  <p>Society</p>
                  <p>Location</p>
                  <p>Admin</p>
                  <p>Tier</p>
                  <p>Status</p>
                </div>

                {/* Table Dynamic Content Mapping */}
                <div className="divide-y divide-gray-100 bg-white">
                  {currentSocieties.map((item: any) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr] px-6 py-3.5 text-sm items-center hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 font-medium text-gray-800">
                        <Building2 className="text-orange-500 size-5 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>

                      <p className="text-gray-600 truncate">
                        {item.city}, {item.country}
                      </p>

                      <p className="text-gray-700 truncate">
                        {item.admin?.name || "N/A"}
                      </p>

                      <div>
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            item.subscriptionPlan === "Standard"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : item.subscriptionPlan === "Premium"
                                ? "bg-rose-50 text-rose-600 border-rose-100"
                                : item.subscriptionPlan === "Enterprise"
                                  ? "bg-purple-50 text-purple-600 border-purple-100"
                                  : "bg-emerald-50 text-emerald-600 border-emerald-100"
                          }`}
                        >
                          {item.subscriptionPlan || "Standard"}
                        </span>
                      </div>

                      <div>
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}

                  {currentSocieties.length === 0 && (
                    <div className="p-8 text-center text-sm text-gray-400">
                      No matching societies data records found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Societies Pagination Logic Blocks */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg transition disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 text-xs sm:text-sm rounded-lg border flex items-center justify-center transition cursor-pointer
                      ${
                        currentPage === pageNumber
                          ? "bg-orange-500 text-white border-orange-500 font-semibold"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-orange-500 hover:text-white"
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg transition disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
