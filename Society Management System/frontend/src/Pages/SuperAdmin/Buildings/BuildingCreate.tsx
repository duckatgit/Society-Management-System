import { Building, Building2, Hash, Layers, Home, MapPin } from "lucide-react";
import PageHeader from "../../../componets/layout/PageHeader";
import { useNavigate } from "react-router-dom";
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useState } from "react";
import { useCreateBuilding } from "../../../Hooks/BuildingApi";

export const BuildingCreate = () => {
  const navigate = useNavigate();
  const { data } = useGetSocieties();
  const society = data?.data || [];

  const { mutate } = useCreateBuilding();

  const [formData, setFormData] = useState({
    name: "",
    societyId: "",
    towerCode: "",
    totalFloors: "",
    totalFlats: "",
    flatType: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    let updatedValue: string | number = value;

    if (name === "location") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }
    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "totalFloors" || name === "totalFlats") {
      updatedValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Building name is required";
    if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!formData.societyId) newErrors.societyId = "Please select a society";
    if (!formData.towerCode.trim())
      newErrors.towerCode = "Tower code is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (!formData.totalFloors || Number(formData.totalFloors) <= 0) {
      newErrors.totalFloors = "Floors must be greater than 0";
    }
    if (!formData.totalFlats || Number(formData.totalFlats) <= 0) {
      newErrors.totalFlats = "Flats must be greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutate(
      {
        ...formData,
        totalFloors: Number(formData.totalFloors),
        totalFlats: Number(formData.totalFlats),
        flatType: formData.flatType,
      },
      {
        onSuccess: (response) => {
          navigate("/super-admin/buildings/Create/Successfully", {
            state: { buildingData: response?.data || response },
          });
        },
      },
    );
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="sm:px-6 lg:px-8">
            <div className="w-full pb-8">
              <PageHeader
                breadcrumb={[
                  { label: "Building", path: "/society-admin/buildings" },
                  { label: "Create Building" },
                ]}
                title="Register New Building"
                description="Provide structural and administrative details to add a new building unit to the OmniSociety ecosystem."
                primaryButtonText="Save Building"
                primaryButtonIcon={<Building />}
                showActivityButton={false}
              />
            </div>

            <div className="min-h-screen bg-slate-50 py-1 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-3 px-8 py-6 border-b border-slate-100 bg-orange-50">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                      <Building2 className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg text-slate-900">
                        Building Specifications
                      </h2>
                      <p className="text-sm text-slate-500">
                        Add a new building to your society
                      </p>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    {/* Building Name Input */}
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-slate-700">
                        Building Name *
                      </label>
                      <input
                        className={`w-full border rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-1 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-slate-300 focus:ring-orange-500 focus:border-orange-500"
                        }`}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        maxLength={30}
                        placeholder="e.g. Skyline Towers"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Society Select */}
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Society *
                        </label>
                        <select
                          name="societyId"
                          value={formData.societyId}
                          onChange={handleInputChange}
                          className={`w-full border rounded-md px-4 h-11 focus:outline-none focus:ring-1 ${
                            errors.societyId
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-orange-500"
                          }`}
                        >
                          <option value="">Select Society</option>
                          {society.map((soc) => (
                            <option key={soc._id} value={soc._id}>
                              {soc.name}
                            </option>
                          ))}
                        </select>
                        {errors.societyId && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.societyId}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Hash size={14} className="text-slate-400" />
                          Tower Code *
                        </label>
                        <input
                          className={`w-full border rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-1 ${
                            errors.towerCode
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-slate-300 focus:ring-orange-500 focus:border-orange-500"
                          }`}
                          type="text"
                          name="towerCode"
                          maxLength={6}
                          value={formData.towerCode}
                          onChange={handleInputChange}
                          placeholder="e.g. TWR-A"
                        />
                        {errors.towerCode && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.towerCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Layers size={14} className="text-slate-400" />
                          Total Floors *
                        </label>
                        <input
                          className={`w-full border rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-1 ${
                            errors.totalFloors
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-slate-300 focus:ring-orange-500 focus:border-orange-500"
                          }`}
                          type="text"
                          name="totalFloors"
                          maxLength={2}
                          value={formData.totalFloors || ""}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                        {errors.totalFloors && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.totalFloors}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Home size={14} className="text-slate-400" />
                          Total Flats *
                        </label>
                        <input
                          className={`w-full border rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-1 ${
                            errors.totalFlats
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-slate-300 focus:ring-orange-500 focus:border-orange-500"
                          }`}
                          type="text"
                          name="totalFlats"
                          maxLength={2}
                          value={formData.totalFlats || ""}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                        {errors.totalFlats && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.totalFlats}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          Flat Type *
                        </label>

                        <input
                          className={`w-full border rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-1 ${
                            errors.flatType
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-slate-300 focus:ring-orange-500 focus:border-orange-500"
                          }`}
                          type="text"
                          name="flatType"
                          value={formData.flatType}
                          onChange={handleInputChange}
                          maxLength={5}
                          placeholder="2 BHK"
                        />

                        {errors.flatType && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.flatType}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          Location *
                        </label>
                        <input
                          className={`w-full border rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-1 ${
                            errors.location
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-slate-300 focus:ring-orange-500 focus:border-orange-500"
                          }`}
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          maxLength={20}
                          placeholder="Mohali"
                        />
                        {errors.location && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => navigate("/society-admin/buildings")}
                      className="px-5 py-2.5 text-sm font-medium cursor-pointer border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-medium cursor-pointer bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600 active:bg-orange-700 transition flex items-center gap-2"
                    >
                      Register Building
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
