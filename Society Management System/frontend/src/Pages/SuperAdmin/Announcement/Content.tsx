import { useState } from "react";
import {
  TriangleAlert,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Pencil,
} from "lucide-react";
import Card from "../../../componets/Card/Card";
import { announce } from "../../../componets/Card/Data";
import PageHeader from "../../../componets/layout/PageHeader";
import { useAnnouncements } from "../../../Hooks/GetAnnouncement";
import { useDeleteAnnouncement } from "../../../Hooks/DeleteAnnouncemnet";
import { toast } from "react-toastify";
import { useUpdateAnnounce } from "../../../Hooks/updateAnnounce";

interface Announcement {
  _id: string;
  title: string;
  category: string;
  publishDate: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Published" | "Draft";
  description?: string;
}

type AnnounceProps = React.ComponentProps<typeof PageHeader>;

export const Content = (props: AnnounceProps) => {
  const deleteMutation = useDeleteAnnouncement();
  const { data: announcementData } = useAnnouncements();

  const { mutate } = useUpdateAnnounce();

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [updateAnnounce, setupdateAnnounce] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "Critical" | "High" | "Medium" | "Low";
    status: "Published" | "Draft";
  }>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Published",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
    toast.success("Announcement Deleted Successfully");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedAnnouncement) return;
    mutate(
      {
        id: selectedAnnouncement._id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Building updated successfully");
          setupdateAnnounce(false);
          setSelectedAnnouncement(null);
        },
        onError: () => {
          toast.error("Failed to update building");
        },
      },
    );
  };

  const priorityConfig: Record<string, string> = {
    Critical: "bg-rose-50 text-rose-700 ring-rose-600/10",
    High: "bg-amber-50 text-amber-700 ring-amber-600/10",
    Medium: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Low: "bg-sky-50 text-sky-700 ring-sky-600/10",
  };

  const rawAnnouncements = announcementData?.data || [];
  const totalPages = Math.max(
    1,
    Math.ceil(rawAnnouncements.length / itemsPerPage),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnnouncements = rawAnnouncements.slice(startIndex, endIndex);

  return (
    <div className="w-full pb-6">
      <PageHeader {...props} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mt-4">
        {announce(announcementData)
          .slice(0, 4)
          .map((card) => (
            <Card key={card.title} {...card} />
          ))}
      </div>
      <div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 mr-6 overflow-hidden">
          <div className="hidden md:grid grid-cols-[2.5fr_1.2fr_1.2fr_1.2fr_1fr_1fr]  bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-700 uppercase items-center">
            <p>Announcement Title</p>
            <p>Recipient Group</p>
            <p>Date Posted</p>
            <p>Priority Status</p>
            <p>Status</p>
            <p className="text-right pr-4">Actions</p>
          </div>

          <div className="divide-y divide-gray-100 w-full">
            {currentAnnouncements.map((announce: Announcement) => {
              const badgeStyle =
                priorityConfig[announce.priority] ||
                "bg-gray-50 text-gray-600 ring-gray-500/10";

              return (
                <div
                  key={announce._id}
                  className="flex flex-col gap-3 md:grid md:grid-cols-[2.5fr_1.2fr_1.2fr_1fr_1fr_1fr] w-full items-start md:items-center px-6 py-5 md:py-4 hover:bg-slate-50/80 transition-colors duration-200"
                >
                  <div className="w-full md:pr-4">
                    <p className="font-semibold text-gray-900 text-sm leading-snug flex gap-2 items-center">
                      <TriangleAlert className="text-red-500 size-5 shrink-0" />
                      <span className="truncate">{announce.title}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center w-full md:w-auto md:contents">
                    <div>
                      <span className="text-sm font-medium text-gray-600 bg-gray-100/60 px-2.5 py-1 rounded-md">
                        {announce.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 font-medium">
                      {new Date(announce.publishDate).toLocaleDateString(
                        "en-US",
                      )}
                    </p>

                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeStyle}`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full mr-1.5"
                          style={{ backgroundColor: "currentColor" }}
                        />
                        {announce.priority}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeStyle}`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full mr-1.5"
                          style={{ backgroundColor: "currentColor" }}
                        />
                        {announce.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-start md:justify-end items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t border-gray-100 md:border-none pr-2">
                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announce);
                        setupdateAnnounce(false);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                    >
                      <Eye size={18} className="text-blue-500 cursor-pointer" />
                    </button>

                    <button
                      onClick={() => handleDelete(announce._id)}
                      disabled={deleteMutation.isPending}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announce);
                        setupdateAnnounce(true);
                        setFormData({
                          title: announce.title,
                          description: announce.description,
                          priority: announce.priority,
                          status: announce.status,
                        });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-yellow-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
              );
            })}

            {rawAnnouncements.length === 0 && (
              <div className="text-center py-12 text-sm text-gray-400 font-medium">
                No announcements found.
              </div>
            )}
          </div>
        </div>

        {/* PAGINATION INTERFACE BAR */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {rawAnnouncements.length === 0 ? 0 : startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(endIndex, rawAnnouncements.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {rawAnnouncements.length}
                </span>{" "}
                announcements
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex gap-1.5 rounded-md"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 border border-gray-200 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center justify-center rounded-lg text-xs font-bold w-8 h-8 transition-all ${
                        currentPage === pageNumber
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 border border-gray-200 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {selectedAnnouncement && !updateAnnounce && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-2.5">
                <TriangleAlert className="text-red-500 size-6 mt-0.5 flex-shrink:0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {selectedAnnouncement.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {selectedAnnouncement.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${priorityConfig[selectedAnnouncement.priority] || "bg-gray-50"}`}
                    >
                      {selectedAnnouncement.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <hr className="border-gray-100 my-3" />

            <div className="text-sm text-gray-600 space-y-3 whitespace-pre-wrap leading-relaxed py-2">
              {selectedAnnouncement.description ||
                "No detailed description available for this announcement."}
            </div>

            <hr className="border-gray-100 my-4" />

            <div className="flex justify-between items-center text-xs text-gray-400">
              <p>
                Posted on:{" "}
                {new Date(selectedAnnouncement.publishDate).toLocaleDateString(
                  "en-US",
                  { dateStyle: "long" },
                )}
              </p>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAnnouncement && updateAnnounce && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 transition-opacity duration-300 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-start pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Update Announcement
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Modify the operational details of your announcement below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setupdateAnnounce(false);
                  setSelectedAnnouncement(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleUpdate}>
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Scheduled System Maintenance"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Provide the core details and timelines..."
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all resize-none"
                />
              </div>

              {/* Priority & Status Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Priority */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Priority Level
                  </label>
                  <div className="relative">
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as
                            "Critical" | "High" | "Medium" | "Low",
                        })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Low">🟢 Low Priority</option>
                      <option value="Medium">🟡 Medium Priority</option>
                      <option value="High">🟠 High Priority</option>
                      <option value="Critical">🔴 Critical Priority</option>
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Publish Status
                  </label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "Draft" | "Published",
                        })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Draft">📁 Save as Draft</option>
                      <option value="Published">🚀 Publish Now</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setupdateAnnounce(false);
                    setSelectedAnnouncement(null);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-2.5 text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                >
                  Update Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
