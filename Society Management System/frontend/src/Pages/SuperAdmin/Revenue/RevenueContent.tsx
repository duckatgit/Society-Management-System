import { useState } from "react";
import Card from "../../../componets/Card/Card";
import { cards } from "../../../componets/Card/Data";
import PageHeader from "../../../componets/layout/PageHeader";
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useBuilding } from "../../../Hooks/GetBuilding";
import { useGetResident } from "../../../Hooks/getResident";
import { useAnnouncements } from "../../../Hooks/GetAnnouncement";
import { Building2, EllipsisVertical } from "lucide-react";

type revenueprps = React.ComponentProps<typeof PageHeader>;

export const RevenueContent = (props: revenueprps) => {
  const { data: societies } = useGetSocieties();
  const { data: buildings } = useBuilding();
  const { data: residents } = useGetResident();
  const { data: announcements } = useAnnouncements();
  const { data } = useGetSocieties();
  const society = data;
  console.log(society);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalItems = society?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentSocieties =
    society?.data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <>
      <PageHeader {...props} />

      <div className="grid grid-col-1 md:grid-cols-4 gap-4 m-4">
        {cards({
          societies: societies?.count || 0,
          buildings: buildings?.count || 0,
          residents: residents?.count || 0,
          announcements: announcements?.count || 0,
          tickets: 12,
        })
          .slice(0, 4)
          .map((card) => (
            <Card key={card.title} {...card} />
          ))}
      </div>

      <div>
        <div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 mr-6 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_1fr_1.5fr_1fr] bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-700 uppercase items-center">
              <div>Society</div>
              <div>Location</div>
              <div>Admin</div>
              <div>Tier</div>
              <div>Status</div>
              <div className="text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-100">
              {currentSocieties.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr_1.5fr] gap-4 px-4 py-4.5 text-sm items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 font-medium text-gray-900 pr-2">
                    <Building2 className="text-red-500 shrink-0 w-5 h-5" />
                    <span className="truncate">{item.name}</span>
                  </div>

                  <p className="text-gray-600 truncate pr-2">
                    {item.city}, {item.country}
                  </p>

                  <p className="text-gray-700 truncate pr-2">
                    {item.admin?.name || "N/A"}
                  </p>

                  <div>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                        item.subscriptionPlan === "Standard"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : item.subscriptionPlan === "Premium"
                            ? "bg-rose-50 text-rose-600 border-rose-100"
                            : item.subscriptionPlan === "Enterprise"
                              ? "bg-purple-50 text-purple-600 border-purple-100"
                              : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}
                    >
                      {item.subscriptionPlan}
                    </span>
                  </div>

                  <div>
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-100">
                      Active
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-gray-100 transition">
                      <EllipsisVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white hover:border-orange-500 text-sm font-medium text-gray-600"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition font-medium text-sm
                    ${
                      currentPage === pageNumber
                        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                        : "border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500"
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
              className="px-3 py-1.5 border border-gray-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white hover:border-orange-500 text-sm font-medium text-gray-600"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};
