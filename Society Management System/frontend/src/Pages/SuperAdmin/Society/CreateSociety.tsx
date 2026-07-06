import React, { useState } from "react";
import { Building2, LocateFixed, Rss, ShieldUser } from "lucide-react";
import PageHeader from "../../../componets/layout/PageHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateSociety } from "../../../Hooks/SocietApi";

const CreateSociety = () => {
  const navigate = useNavigate();
  const { createSociety: mutate, isLoading: isPending } = useCreateSociety();

  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    societyType: "Residential Society",
    address: "",
    city: "",
    country: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    subscriptionPlan: "Premium",
    password: "",
  });

  const [errors, setErrors] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors) setErrors(null);
  };

  const handlePlanSelect = (planName: string) => {
    setFormData((prev) => ({ ...prev, subscriptionPlan: planName }));
  };

  const validateForm = (): boolean => {
    if (formData.name.trim().length < 3) {
      const errorMsg = "Society name must be at least 3 characters long.";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (formData.registrationNumber.trim().length !== 6) {
      const errorMsg = "Registration number must be exactly 6 characters long.";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (formData.adminName.trim().length < 3) {
      const errorMsg = "Admin full name must be at least 3 characters long.";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (formData.password.length !== 6) {
      const errorMsg = "Password must be exactly 6 characters long.";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.adminEmail)) {
      const errorMsg = "Please enter a valid email address.";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.adminPhone)) {
      const errorMsg =
        "Contact number must be exactly 10 digits containing only numbers.";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    // 7. Check for empty mandatory location fields
    if (
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.country.trim()
    ) {
      const errorMsg =
        "Please fill in all mandatory location fields (Address, City, Country).";
      setErrors(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const response = await mutate(formData);

    if (response && response.success) {
      toast.success("Society successfully created");
      navigate("/super-admin/Societies/Create/Successfully", {
        state: { societyData: response.data },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sm:px-6 lg:px-8">
        <div className="w-full pb-8">
          <PageHeader
            breadcrumb={[
              { label: "Society", path: "/super-admin/Societies" },
              { label: "Create Society" },
            ]}
            title="Create Society"
            description="Add a new residential or commercial society into the system"
            showActivityButton={false}
          />
        </div>

        {/* Section 1: Basic Details */}
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="text-orange-500" />
              <h2 className="font-semibold text-lg">Basic Details</h2>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">
                Society Name
              </label>
              <input
                className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="name"
                maxLength={50}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Grand Oak Residences Complex"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Registration Number (6 Characters)
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., REG123"
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Society Type
                </label>
                <select
                  name="societyType"
                  value={formData.societyType}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Residential Society">
                    Residential Society
                  </option>
                  <option value="Apartment Complex">Apartment Complex</option>
                  <option value="Gated Community">Gated Community</option>
                  <option value="Housing Society">Housing Society</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Location Information */}
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow mt-5">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <LocateFixed className="text-orange-500" />
              <h2 className="font-semibold text-lg">Location Information</h2>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">
                Physical Address
              </label>
              <input
                className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="address"
                maxLength={50}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Suite/Building Number, Street Name..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  name="city"
                  maxLength={15}
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Select or type city"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Country
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  name="country"
                  maxLength={15}
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter Your Country"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Primary Administrator */}
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow mt-5">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShieldUser className="text-orange-500" />
              <h2 className="font-semibold text-lg">Primary Administrator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  name="adminName"
                  maxLength={15}
                  value={formData.adminName}
                  onChange={handleInputChange}
                  placeholder="e.g., Jonathan R Smith"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Temporary Password (Exactly 6 Characters)
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="e.g., PASS12"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Work Email
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="email"
                  name="adminEmail"
                  maxLength={20}
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  placeholder="administrator@yourdomain.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Contact Number (10 Digits)
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-4 h-11 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  name="adminPhone"
                  value={formData.adminPhone}
                  onChange={handleInputChange}
                  placeholder="e.g., 9876543210"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Subscription Plans */}
        <div className="bg-white max-w-4xl p-6 mx-auto rounded-lg shadow mt-5">
          <span className="flex gap-2">
            <Rss className="text-orange-500" />
            <h2 className="font-semibold text-lg">Subscription Plans</h2>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {/* Standard Card */}
            <div
              onClick={() => handlePlanSelect("Standard")}
              className={`border rounded-xl p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                formData.subscriptionPlan === "Standard"
                  ? "border-orange-500 bg-orange-50/30"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-base font-semibold">Standard</h3>
              <p className="text-xs text-gray-500 mt-1">Up to 100 Units</p>
              <div className="mt-3">
                <span className="text-2xl font-bold">$299</span>
                <span className="text-xs text-gray-500">/mo</span>
              </div>
              <button
                type="button"
                className={`mt-4 w-full py-2 text-sm rounded-lg font-medium transition ${
                  formData.subscriptionPlan === "Standard"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {formData.subscriptionPlan === "Standard"
                  ? "Selected"
                  : "Select"}
              </button>
            </div>

            {/* Premium Card */}
            <div
              onClick={() => handlePlanSelect("Premium")}
              className={`relative border rounded-xl p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                formData.subscriptionPlan === "Premium"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              <span className="absolute -top-2 right-3 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                Popular
              </span>
              <h3 className="text-base font-semibold">Premium</h3>
              <p className="text-xs text-gray-500 mt-1">Up to 500 Units</p>
              <div className="mt-3">
                <span className="text-2xl font-bold text-orange-600">$599</span>
                <span className="text-xs text-gray-500">/mo</span>
              </div>
              <button
                type="button"
                className={`mt-4 w-full py-2 text-sm rounded-lg font-medium transition ${
                  formData.subscriptionPlan === "Premium"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {formData.subscriptionPlan === "Premium"
                  ? "Selected"
                  : "Select"}
              </button>
            </div>

            {/* Enterprise Card */}
            <div
              onClick={() => handlePlanSelect("Enterprise")}
              className={`border rounded-xl p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                formData.subscriptionPlan === "Enterprise"
                  ? "border-orange-500 bg-orange-50/30"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-base font-semibold">Enterprise</h3>
              <p className="text-xs text-gray-500 mt-1">Unlimited Units</p>
              <div className="mt-3">
                <span className="text-2xl font-bold">Custom</span>
              </div>
              <button
                type="button"
                className={`mt-4 w-full py-2 text-sm rounded-lg font-medium transition ${
                  formData.subscriptionPlan === "Enterprise"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {formData.subscriptionPlan === "Enterprise"
                  ? "Selected"
                  : "Contact"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert Box Banner */}
      {errors && (
        <div className="max-w-4xl mx-auto mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center font-medium animate-pulse">
          {errors}
        </div>
      )}

      {/* Submission Actions Footer Bar */}
      <div className="bg-white max-w-4xl mx-auto h-16 flex items-center justify-end gap-3 px-6 mt-5 rounded-lg shadow">
        <button
          type="button"
          disabled={isPending}
          onClick={() => navigate("/super-admin/Societies")}
          className="px-5 cursor-pointer py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="px-5 cursor-pointer py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Society"}
        </button>
      </div>
    </form>
  );
};

export default CreateSociety;
