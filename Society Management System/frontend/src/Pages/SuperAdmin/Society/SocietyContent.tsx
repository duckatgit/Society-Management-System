import { useState } from "react";
import {
  Building2,
  Eye,
  Trash2,
  X,
  MapPin,
  User,
  ShieldCheck,
  Pencil,
} from "lucide-react";
import Card from "../../../componets/Card/Card";
import { getSocietyCard } from "../../../componets/Card/Data";

import PageHeader from "../../../componets/layout/PageHeader";
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useSocietyDelete } from "../../../Hooks/DeleteSociety";
import { toast } from "react-toastify";
import { useUpdateSociety } from "../../../Hooks/updateSociety";

type SocietyProps = React.ComponentProps<typeof PageHeader>;

const SocietyContent = (props: SocietyProps) => {
  const { data } = useGetSocieties();
  const society = data;
  console.log(society);

  const deleteSociety = useSocietyDelete();
  const { mutate } = useUpdateSociety();

  const handleDelete = (id: string) => {
    deleteSociety.mutate(id);
    toast.success("Society deleted successfully");
  };

  const [selectedSociety, setSelectedSociety] = useState(null);
  const [updateSociety, setUpdateSociety] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    societyType: "",
    address: "",
    city: "",
    country: "",
    subscriptionPlan: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Society name is required");
      return false;
    }

    if (formData.name.trim().length > 25) {
      toast.error("Society name cannot exceed 25 characters");
      return false;
    }

    if (formData.registrationNumber.trim().length !== 6) {
      toast.error("Registration number must be exactly 6 characters");
      return false;
    }

    if (!formData.adminName.trim()) {
      toast.error("Admin name is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.adminEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.adminPhone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }

    if (formData.city.trim().length > 10) {
      toast.error("City cannot exceed 10 characters");
      return false;
    }

    if (formData.country.trim().length > 12) {
      toast.error("Country cannot exceed 12 characters");
      return false;
    }

    if (!formData.societyType) {
      toast.error("Please select a society type");
      return false;
    }

    return true;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedSociety) return;

    if (!validateForm()) return;

    mutate(
      {
        id: selectedSociety._id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Society updated successfully");
          setUpdateSociety(false);
          setSelectedSociety(null);
        },
        onError: () => {
          toast.error("Society update failed");
        },
      },
    );
  };

  // Pagination
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 px-4 mt-4">
        {getSocietyCard(data)
          .slice(0, 4)
          .map((card, index) => (
            <Card key={index} {...card} />
          ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full mt-5 p-4 overflow-y-hidden">
        <div className="overflow-x-auto overflow-y-hidden h-[16em] w-full">
          <div className="min-w-[43.75em]">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr_1.8fr_1fr] gap-4 bg-gray-50 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm mb-2">
              <div>Society</div>
              <div>Location</div>
              <div>Admin</div>
              <div>Email</div>
              <div>Tier</div>
              <div>Status</div>
              <div className="text-right pr-4">Actions</div>
            </div>

            <div className="divide-y divide-gray-100 overflow-y-hidden">
              {currentSocieties.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr_1.8fr_1fr] gap-4 px-4 py-3.5 text-sm items-center hover:bg-gray-50/40 transition-colors"
                >
                  <div className="flex items-center gap-3 font-medium text-gray-900 pr-2">
                    <Building2 className="text-red-500 shrink-0 w-5 h-5" />
                    <span className="flex-row">
                      <span className="truncate">{item.name}</span>
                      <p className="text-gray-700 truncate pr-2">
                        {item?.registrationNumber || "—"}
                      </p>
                    </span>
                  </div>

                  <p className="text-gray-600 truncate pr-2">
                    {item.city}, {item.country}
                    {item.description}
                  </p>

                  <p className="text-gray-700 truncate pr-2">
                    {item.admin?.name || "—"}
                  </p>
                  <p className="text-gray-700 pr-2">
                    {item.admin?.email || "—"}
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

                  <div className="flex justify-end items-center gap-2 pr-2">
                    <button
                      onClick={() => setSelectedSociety(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSociety(item);
                        setUpdateSociety(true);
                        setFormData({
                          name: item.name || "",
                          registrationNumber: item.registrationNumber || "",
                          societyType: item.societyType || "",
                          address: item.address || "",
                          city: item.city || "",
                          country: item.country || "",
                          subscriptionPlan: item.subscriptionPlan || "Standard",
                          adminName: item.admin?.name || "",
                          adminEmail: item.admin?.email || "",
                          adminPhone: item.admin?.phone || "",
                        });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-yellow-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Pencil size={18} />
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
              className="px-3 py-1.5 border border-gray-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white hover:border-orange-500 text-sm font-medium text-gray-600 cursor-pointer"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition font-medium text-sm cursor-pointer
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
              className="px-3 py-1.5 border border-gray-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white hover:border-orange-500 text-sm font-medium text-gray-600 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        {selectedSociety && !updateSociety && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative max-h-[85vh] overflow-y-auto border border-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-red-50 rounded-xl text-red-500 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight truncate max-w-15rem">
                      {selectedSociety.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Reg No: {selectedSociety.registrationNumber || "—"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSociety(null)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <hr className="border-gray-100 my-4" />

              <div className="space-y-4 py-1">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Location
                    </p>
                    <p className="text-gray-800 font-medium mt-0.5">
                      {selectedSociety.city}, {selectedSociety.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Society Admin
                    </p>
                    <p className="text-gray-800 font-medium mt-0.5">
                      {selectedSociety.admin?.name || "—"}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-xs text-gray-400 font-medium">
                      Admin Email
                    </p>
                    <p className="text-gray-800 font-medium mt-0.5">
                      {selectedSociety.admin?.email || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Subscription Plan
                    </p>
                    <div className="mt-1">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border ${
                          selectedSociety.subscriptionPlan === "Standard"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : selectedSociety.subscriptionPlan === "Premium"
                              ? "bg-rose-50 text-rose-600 border-rose-100"
                              : selectedSociety.subscriptionPlan ===
                                  "Enterprise"
                                ? "bg-purple-50 text-purple-600 border-purple-100"
                                : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}
                      >
                        {selectedSociety.subscriptionPlan}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Status</p>
                    <p className="text-emerald-600 font-semibold text-xs mt-0.5">
                      Active
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedSociety(null)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedSociety && updateSociety && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
              <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Update Society
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modify the profile and subscription details below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUpdateSociety(false);
                    setSelectedSociety(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Society Name (Max 25 Characters)
                  </label>
                  <input
                    type="text"
                    maxLength={25}
                    placeholder="e.g., Green Valley Residency"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Registration Number (6 characters)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g., BR8941"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Nikhil"
                      value={formData.adminName}
                      onChange={(e) =>
                        setFormData({ ...formData, adminName: e.target.value })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      placeholder="e.g., nikhil@gmail.com"
                      value={formData.adminEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, adminEmail: e.target.value })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone No. (10 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="e.g., 9876543210"
                    value={formData.adminPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, adminPhone: e.target.value })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Street address, apartment complex..."
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      City (Max 10 Characters)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Country (Max 12 Characters)
                    </label>
                    <input
                      type="text"
                      maxLength={12}
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Society Type
                  </label>
                  <select
                    value={formData.societyType}
                    onChange={(e) =>
                      setFormData({ ...formData, societyType: e.target.value })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all cursor-pointer"
                  >
                    <option value="" disabled>
                      Society Type
                    </option>
                    <option value="Residential Society">
                      Residential Society
                    </option>
                    <option value="Apartment Complex">Apartment Complex</option>
                    <option value="Gated Community">Gated Community</option>
                    <option value="Housing Society">Housing Society</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Subscription Plan
                  </label>
                  <select
                    value={formData.subscriptionPlan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subscriptionPlan: e.target.value,
                      })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all cursor-pointer"
                  >
                    <option value="Standard">Standard Tier</option>
                    <option value="Premium">Premium Tier</option>
                    <option value="Enterprise">Enterprise Tier</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateSociety(false);
                      setSelectedSociety(null);
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-2.5 text-sm font-medium rounded-xl shadow-sm transition-all"
                  >
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SocietyContent;
