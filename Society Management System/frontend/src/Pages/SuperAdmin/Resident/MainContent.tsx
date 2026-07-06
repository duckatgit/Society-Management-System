import { useState } from "react";
import {
  Building,
  Home,
  Eye,
  Trash2,
  Pencil,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Card from "../../../componets/Card/Card";

import PageHeader from "../../../componets/layout/PageHeader";
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useGetResident } from "../../../Hooks/getResident";
import { useBuilding } from "../../../Hooks/GetBuilding";
import { useDeleteResident } from "../../../Hooks/deleteResident";
import { useUpadteResident } from "../../../Hooks/updateResident";
import { toast } from "react-toastify";
import { getResidentCard } from "../../../componets/Card/ResidentCard";

type MainContentProps = React.ComponentProps<typeof PageHeader>;

export interface Resident {
  _id?: string;
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  societyId: string;
  buildingId: string;
  unit: string;
  role: "owner" | "tenant";
  isActive: boolean;
  avatar?: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface ResidentPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  societyId: string;
  buildingId: string;
  unit: string;
  role?: "owner" | "tenant";
  status: "Active" | "Inactive";
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export const MainContent = (props: MainContentProps) => {
  const { data: societiesData } = useGetSocieties();
  const { data: residents } = useGetResident();
  const { data: buildingsData } = useBuilding();

  const deleteResident = useDeleteResident();
  const { mutate } = useUpadteResident();

  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    null,
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState<ResidentPayload>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
    societyId: "",
    buildingId: "",
    unit: "",
    role: "owner",
    status: "Active",
    emergencyContact: {
      name: "",
      relation: "",
      phone: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneStr = formData.phone.toString();
    if (!formData.phone || phoneStr.length < 10 || phoneStr.length > 15) {
      newErrors.phone = "Enter a valid phone number (10-15 digits).";
    }

    if (!formData.unit.trim()) {
      newErrors.unit = "Unit ID is required.";
    }

    // Emergency contact validation
    if (!formData.emergencyContact.name.trim()) {
      newErrors.emergencyName = "Emergency contact name is required.";
    }
    if (!formData.emergencyContact.relation.trim()) {
      newErrors.emergencyRelation = "Relationship standard is required.";
    }

    const emergencyPhoneStr = formData.emergencyContact.phone.toString();
    if (
      !formData.emergencyContact.phone ||
      emergencyPhoneStr.length < 10 ||
      emergencyPhoneStr.length > 15
    ) {
      newErrors.emergencyPhone =
        "Enter a valid emergency phone (10-15 digits).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = (id: string) => {
    deleteResident.mutate(id);
    toast.success("Resident deleted successfully");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResident) return;

    if (!validateForm()) {
      toast.error("Please clean up the highlighted form errors.");
      return;
    }

    mutate(
      {
        id: selectedResident._id || selectedResident.id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Resident updated successfully");
          setIsEditMode(false);
          setSelectedResident(null);
          setErrors({});
        },
        onError: () => {
          toast.error("Failed to update resident");
        },
      },
    );
  };

  const getSocietyName = (id: string) => {
    if (!societiesData?.data) return "Loading...";
    const society = societiesData.data.find(
      (society) => society._id === id || society.id === id,
    );
    return society ? society.name : "Unknown Society";
  };

  const getBuildingName = (id: string) => {
    if (!buildingsData?.data) return "Loading...";
    const building = buildingsData.data.find(
      (building) => building._id === id || building.id === id,
    );
    return building ? building.name : "Unknown Building";
  };

  const roleConfig: Record<string, string> = {
    owner: "bg-purple-50 text-purple-700 ring-purple-600/10",
    tenant: "bg-blue-50 text-blue-700 ring-blue-600/10",
  };

  const rawResidents = residents?.data || [];
  const totalPages = Math.max(1, Math.ceil(rawResidents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResidents = rawResidents.slice(startIndex, endIndex);

  return (
    <div className="w-full pb-6">
      <PageHeader {...props} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mt-4">
        {getResidentCard(residents)
          .slice(0, 5)
          .map((card) => (
            <Card key={card.title} {...card} />
          ))}
      </div>

      <div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 mr-6 overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.5fr_1.2fr_1.5fr_1fr_1fr_1fr_1fr_1fr]  bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-700 uppercase items-center">
            <p>Society</p>
            <p>Building</p>
            <p>Resident Name</p>
            <p>Phone</p>
            <p>Unit No</p>
            <p>Role</p>
            <p>Status</p>
            <p className="text-right pr-4">Actions</p>
          </div>

          <div className="divide-y divide-gray-100 w-full">
            {currentResidents.map((res: Resident, index: number) => {
              return (
                <div
                  key={res._id || res.id || index}
                  className="flex flex-col gap-3 md:grid md:grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1fr_1fr_1fr_1fr] w-full items-start md:items-center px-6 py-5 md:py-4 hover:bg-slate-50/80 transition-colors duration-200"
                >
                  <div className="w-full md:pr-4">
                    <p className="text-sm text-gray-600 font-medium flex gap-2 items-center">
                      <Building className="text-orange-500 size-5 shrink-0" />
                      <span className="truncate">
                        {getSocietyName(res.societyId)}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center w-full md:w-auto md:contents">
                    <div>
                      <p className="text-sm text-gray-600 font-medium flex gap-2 items-center">
                        <Home className="text-blue-500 size-5 shrink-0" />
                        <span className="truncate">
                          {getBuildingName(res.buildingId)}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-900 text-sm leading-snug">
                        {res.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-150px">
                        {res.email}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 font-medium">
                      {res.phone || "—"}
                    </p>

                    <p className="text-sm text-gray-700 font-medium">
                      #{res.unit}
                    </p>

                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          roleConfig[res.role] ||
                          "bg-gray-50 text-gray-600 ring-gray-500/10"
                        }`}
                      >
                        {res.role}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          res.isActive
                            ? "bg-green-50 text-green-700 ring-green-600/10"
                            : "bg-red-50 text-red-700 ring-red-600/10"
                        }`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full mr-1.5"
                          style={{ backgroundColor: "currentColor" }}
                        />
                        {res.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-start md:justify-end items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t border-gray-100 md:border-none pr-2">
                    <button
                      onClick={() => {
                        setSelectedResident(res);
                        setIsEditMode(false);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                    >
                      <Eye size={18} className="text-blue-500" />
                    </button>

                    <button
                      onClick={() => handleDelete(res._id || res.id || "")}
                      disabled={deleteResident.isPending}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedResident(res);
                        setIsEditMode(true);
                        setErrors({});
                        setFormData({
                          fullName: res.fullName,
                          phone: res.phone,
                          email: res.email,
                          password: "",
                          avatar: res.avatar || "",
                          societyId: res.societyId,
                          buildingId: res.buildingId,
                          unit: res.unit,
                          role: res.role as "owner" | "tenant",
                          status: res.isActive ? "Active" : "Inactive",
                          emergencyContact: {
                            name: res.emergencyContact?.name || "",
                            relation: res.emergencyContact?.relation || "",
                            phone: res.emergencyContact?.phone || "",
                          },
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

            {rawResidents.length === 0 && (
              <div className="text-center py-12 text-sm text-gray-400 font-medium">
                No residents found.
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          {/* Pagination UI Code blocks stay exact */}
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {rawResidents.length === 0 ? 0 : startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(endIndex, rawResidents.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {rawResidents.length}
                </span>{" "}
                residents
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
                  className="relative inline-flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 border border-gray-200 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center justify-center rounded-lg text-xs font-bold w-8 h-8 transition-all ${currentPage === pageNumber ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
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
                  className="relative inline-flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 border border-gray-200 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {selectedResident && !isEditMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-2.5">
                <Home className="text-blue-500 size-6 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {selectedResident.fullName}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      Unit {selectedResident.unit}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${roleConfig[selectedResident.role] || "bg-gray-50"}`}
                    >
                      {selectedResident.role}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedResident(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <hr className="border-gray-100 my-3" />

            <div className="space-y-4 py-2 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <p className="font-medium text-gray-900 truncate">
                    {selectedResident.email}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <p className="font-medium text-gray-900">
                    {selectedResident.phone || "—"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Society
                  </label>
                  <p className="font-medium text-gray-900">
                    {getSocietyName(selectedResident.societyId)}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Building
                  </label>
                  <p className="font-medium text-gray-900">
                    {getBuildingName(selectedResident.buildingId)}
                  </p>
                </div>
              </div>

              {selectedResident.emergencyContact && (
                <div className="border-t border-gray-100 pt-3">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Emergency Contact
                  </label>
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-gray-400 block">Name</span>
                      <p className="font-semibold text-gray-800">
                        {selectedResident.emergencyContact.name || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Relation</span>
                      <p className="font-semibold text-gray-800">
                        {selectedResident.emergencyContact.relation || "—"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400 block">Phone</span>
                      <p className="font-semibold text-gray-800">
                        {selectedResident.emergencyContact.phone || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Account Status
                </label>
                <p
                  className={`font-semibold ${selectedResident.isActive ? "text-green-600" : "text-red-600"}`}
                >
                  {selectedResident.isActive
                    ? " Active Operational Member"
                    : " Inactive Dynamic Block"}
                </p>
              </div>
            </div>

            <hr className="border-gray-100 my-4" />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedResident(null)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL WITH LIVE VALIDATIONS --- */}
      {selectedResident && isEditMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Update Resident Profile
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Modify location assignment records and core data
                  configurations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedResident(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleUpdate} noValidate>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full text-sm border rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all ${errors.fullName ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full text-sm border rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all ${errors.email ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="10 digits"
                    value={formData.phone || ""}
                    onChange={(e) => {
                      // Remove non-digits
                      const cleanValue = e.target.value.replace(/\D/g, "");
                      setFormData({
                        ...formData,
                        phone: cleanValue,
                      });
                    }}
                    className={`w-full text-sm border rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all ${errors.phone ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Password{" "}
                  <span className="text-slate-400 font-normal">
                    (Leave blank if unchanged)
                  </span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>

              {/* Unit, Role & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Unit ID
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6 char"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    className={`w-full text-sm border rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all ${errors.unit ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                  />
                  {errors.unit && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.unit}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Community Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "owner" | "tenant",
                      })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 bg-slate-50/50 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="owner">Owner</option>
                    <option value="tenant">Tenant</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Emergency Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            name: e.target.value,
                          },
                        })
                      }
                      className={`w-full text-xs border rounded-xl px-3 py-2 text-slate-800 focus:outline-none transition-all ${errors.emergencyName ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                    />
                    {errors.emergencyName && (
                      <p className="text-red-500 text-[10px] mt-0.5 font-medium">
                        {errors.emergencyName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Relation
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.relation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            relation: e.target.value,
                          },
                        })
                      }
                      className={`w-full text-xs border rounded-xl px-3 py-2 text-slate-800 focus:outline-none transition-all ${errors.emergencyRelation ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                    />
                    {errors.emergencyRelation && (
                      <p className="text-red-500 text-[10px] mt-0.5 font-medium">
                        {errors.emergencyRelation}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="10 digits"
                      value={formData.emergencyContact.phone || ""}
                      onChange={(e) => {
                        const cleanValue = e.target.value.replace(/\D/g, "");
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            phone: cleanValue,
                          },
                        });
                      }}
                      className={`w-full text-xs border rounded-xl px-3 py-2 text-slate-800 focus:outline-none transition-all ${errors.emergencyPhone ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"}`}
                    />
                    {errors.emergencyPhone && (
                      <p className="text-red-500 text-[10px] mt-0.5 font-medium">
                        {errors.emergencyPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditMode(false);
                    setSelectedResident(null);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-2.5 text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Update Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
