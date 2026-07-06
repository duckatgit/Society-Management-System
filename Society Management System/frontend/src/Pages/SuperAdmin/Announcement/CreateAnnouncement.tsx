import React, { useState } from "react";
import { Megaphone, Settings, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../componets/layout/PageHeader";
import { useAnnouncement } from "../../../Hooks/Announcement";
import { type AnnouncementPayload } from "../../../API/GetService";
import { useGetSocieties } from "../../../Hooks/GetSocieties";

const AVAILABLE_ROLES = ["Resident", "Society Admin", "Security Guard"];

const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const { createAnnouncement, isLoading } = useAnnouncement();
  const { data } = useGetSocieties();
  const societiesList = data?.data || [];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General Notice",
    priority: "Medium",
    sendTo: [] as string[],
    societies: [] as string[],
    publishDate: "",
    expiryDate: "",
    isPinned: false,
    status: "Published",
    createdBy: "6853d0f5c8a7a1e9f1234567",
  });

  const [errors, setErrors] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors) setErrors(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayToggle = (field: "sendTo" | "societies", value: string) => {
    setFormData((prev) => {
      const exists = prev[field].includes(value);
      const updatedArray = exists
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updatedArray };
    });
    if (errors) setErrors(null);
  };

  const validateForm = (): boolean => {
    if (formData.title.trim().length < 5) {
      setErrors("Announcement title must be at least 5 characters long.");
      toast.error("Announcement title must be at least 5 characters.");
      return false;
    }

    if (!formData.description.trim()) {
      setErrors("Description is required.");
      toast.error("Description is required.");
      return false;
    }

    if (!formData.category || !formData.priority || !formData.createdBy) {
      setErrors("Please fill in all mandatory dropdown fields.");
      toast.error("Please fill in all mandatory fields.");
      return false;
    }

    if (formData.sendTo.length === 0) {
      setErrors("Please select at least one recipient role.");
      toast.error("Please select target roles.");
      return false;
    }

    if (formData.societies.length === 0) {
      setErrors("Please select at least one society.");
      toast.error("Please select targeted societies.");
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload: AnnouncementPayload = {
      title: formData.title,
      description: formData.description,
      category: formData.category as any,
      priority: formData.priority as any,
      sendTo: formData.sendTo,
      societies: formData.societies,
      publishDate: formData.publishDate
        ? new Date(formData.publishDate).toISOString()
        : undefined,
      expiryDate: formData.expiryDate
        ? new Date(formData.expiryDate).toISOString()
        : undefined,
      isPinned: formData.isPinned,
      status: formData.status as any,
      createdBy: formData.createdBy,
    };

    const result = await createAnnouncement(payload);

    if (result && result.success) {
      toast.success(result.message || "Announcement successfully created");
      navigate("/super-admin/Announcement/create-success", {
        state: { announcementData: result },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sm:px-6 lg:px-8">
        <div className="w-full pb-8">
          <PageHeader
            breadcrumb={[
              { label: "Announcements", path: "/super-admin/Announcements" },
              { label: "Create Announcement" },
            ]}
            title="Create Announcement"
            description="Broadcast important updates, alerts, or details to multiple societies and roles simultaneously"
            showActivityButton={false}
          />
        </div>

        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Megaphone className="text-orange-500" />
              <h2 className="font-semibold text-lg">Announcement Details</h2>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">
                Announcement Title *
              </label>
              <input
                className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="title"
                value={formData.title}
                maxLength={50}
                onChange={handleInputChange}
                placeholder="e.g., Scheduled Power Outage Announcement"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">
                Description *
              </label>
              <textarea
                className="w-full border border-slate-300 rounded-md p-4 min-h-120px focus:outline-none focus:ring-2 focus:ring-orange-500"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed descriptions here..."
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow mt-5">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="text-orange-500" />
              <h2 className="font-semibold text-lg">
                Targeting & Classifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="General Notice">General Notice</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Event">Event</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Created By *
                </label>
                <select
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-md px-4 h-11 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="6853d0f5c8a7a1e9f1234567">
                    SuperAdmin - Nikhil Thakur
                  </option>
                </select>
              </div>

              <div className="flex items-end pb-3">
                <label
                  htmlFor="isPinned"
                  className="text-sm font-medium flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id="isPinned"
                    name="isPinned"
                    checked={formData.isPinned}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  Pin this Announcement
                </label>
              </div>
            </div>

            <hr className="my-6 border-slate-200" />

            <div className="mb-6">
              <label className="block mb-3 text-sm font-semibold text-gray-700">
                Send To Roles * (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                {AVAILABLE_ROLES.map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={formData.sendTo.includes(role)}
                      onChange={() => handleArrayToggle("sendTo", role)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <label className="block mb-3 text-sm font-semibold text-gray-700">
                Target Societies * (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 maximum-h-[200px] overflow-y-auto">
                {societiesList.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">
                    No societies found.
                  </p>
                ) : (
                  societiesList.map((soc) => (
                    <label
                      key={soc._id}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={formData.societies.includes(soc._id)}
                        onChange={() => handleArrayToggle("societies", soc._id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      {soc.name}
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow mt-5">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="text-orange-500" />
              <h2 className="font-semibold text-lg">Timeline Configurations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Publish Date
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Expiry Date
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={
                    formData.publishDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="Draft"
                    checked={formData.status === "Draft"}
                    onChange={handleInputChange}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  Draft
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="Published"
                    checked={formData.status === "Published"}
                    onChange={handleInputChange}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  Published
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {errors && (
        <div className="max-w-4xl mx-auto mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center font-medium">
          {errors}
        </div>
      )}

      <div className="bg-white max-w-4xl mx-auto h-16 flex items-center justify-end gap-3 px-6 mt-5 rounded-lg shadow">
        <button
          type="button"
          onClick={() => navigate("/super-admin/Announcement")}
          className="px-5 cursor-pointer py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          disabled={isLoading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 cursor-pointer py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreateAnnouncement;
