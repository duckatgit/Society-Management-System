import {
  HeartHandshake,
  UploadCloud,
  User2,
  Building2,
  ShieldCheck,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useBuilding } from "../../../Hooks/GetBuilding";
import { useCreateResident } from "../../../Hooks/Resident";
import PageHeader from "../../../componets/layout/PageHeader";

const AddResident = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: societiesData, isLoading: societiesLoading } =
    useGetSocieties();
  const { data: buildingsData, isLoading: buildingsLoading } = useBuilding();

  const { handleCreateResident } = useCreateResident();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [role, setRole] = useState<"owner" | "tenant">("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    password: "",
    societyId: "",
    buildingId: "",
    unit: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "emergencyPhone") {
      const cleanValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
      return;
    }

    if (
      name === "fullName" ||
      name === "emergencyName" ||
      name === "emergencyRelation"
    ) {
      const alphaValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: alphaValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (
      !formData.email ||
      !formData.fullName ||
      !formData.societyId ||
      !formData.buildingId ||
      !formData.password ||
      !formData.unit ||
      !formData.phone ||
      !formData.emergencyName ||
      !formData.emergencyRelation ||
      !formData.emergencyPhone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // 2. Strict Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // 3. Alphabetical Character Strict Assertions (No Numbers/Symbols)
    const alphaRegex = /^[a-zA-Z\s]+$/;
    if (!alphaRegex.test(formData.fullName.trim())) {
      toast.error("Full Name must contain only letters and spaces.");
      return;
    }

    if (!alphaRegex.test(formData.emergencyName.trim())) {
      toast.error(
        "Emergency Contact Name must contain only letters and spaces.",
      );
      return;
    }

    if (!alphaRegex.test(formData.emergencyRelation.trim())) {
      toast.error("Emergency Relation must contain only letters and spaces.");
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.emergencyPhone.length !== 10) {
      toast.error("Emergency phone number must be exactly 10 digits.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone,
        password: formData.password,
        societyId: formData.societyId,
        buildingId: formData.buildingId,
        unit: formData.unit,
        role: role,
        emergencyContact: {
          name: formData.emergencyName.trim(),
          relation: formData.emergencyRelation.trim(),
          phone: formData.emergencyPhone,
        },
        avatar: avatar ? "" : undefined,
      };

      await handleCreateResident(payload);

      toast.success("Resident Created Successfully");
      navigate("/super-admin/Residents");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        "Failed to register resident. Please try again.";
      toast.error(errorMsg);
    }
    {
      setIsSubmitting(false);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const Discard = () => {
    toast.error("Draft discarded");
    navigate("/super-admin/Residents");
  };

  return (
    <div className="w-full pb-16 space-y-8 bg-neutral-50/50 min-h-screen">
      <PageHeader
        breadcrumb={[
          { label: "Residents", path: "/super-admin/residents" },
          { label: "Add Resident" },
        ]}
        title="Add Resident"
        description="Register a new owner or tenant into the OmniSociety ecosystem."
        primaryButtonText={isSubmitting ? "Saving..." : "Save Resident"}
        primaryButtonIcon={<User2 size={18} />}
        onPrimaryClick={() => handleRegister()} // Trigger form logic when PageHeader action fires
        activityButtonText="Cancel"
        showActivityButton
        onActivityClick={() => navigate("/super-admin/Residents")}
      />

      <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
        <form
          onSubmit={handleRegister}
          className="col-span-12 lg:col-span-9 space-y-6"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[15em] shrink-0">
              <div
                onClick={handleUploadClick}
                className="relative h-52 rounded-2xl border border-dashed border-neutral-200 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-neutral-900 transition-all group overflow-hidden"
              >
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <UploadCloud
                      size={28}
                      className="text-neutral-400 mb-2 group-hover:text-neutral-600 transition-colors"
                    />
                    <p className="text-sm font-semibold text-neutral-800">
                      Upload Avatar
                    </p>
                    <span className="text-xs text-neutral-400 mt-1">
                      PNG / JPG up to 5MB
                    </span>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                <button
                  type="button"
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center text-lg font-medium hover:bg-orange-600 transition-colors shadow-sm"
                >
                  {avatar ? "✓" : "+"}
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white border border-neutral-200/60 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-black">
                Resident Details
              </h2>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                maxLength={40}
                className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                placeholder="Email"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={formData.fullName}
                  maxLength={30}
                  onChange={handleInputChange}
                  className="h-11 px-4 rounded-xl border border-neutral-200 bg-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                  placeholder="Full Name"
                />
                <input
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-11 px-4 rounded-xl border border-neutral-200 bg-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                  placeholder="Phone (10 digits)"
                />
              </div>

              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-neutral-200 bg-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <div
                  className="absolute right-3 top-3.5 text-neutral-400 cursor-pointer hover:text-neutral-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-center">
                <Building2 className="text-orange-600 " size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-black">
                  Residency Information
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Assign unit and operational roles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <select
                name="societyId"
                value={formData.societyId}
                onChange={handleInputChange}
                className="md:col-span-5 h-11 px-4 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900"
              >
                <option value="">
                  {societiesLoading ? "Loading Societies..." : "Select Society"}
                </option>
                {societiesData?.data?.map((society) => (
                  <option
                    key={society.id || society._id}
                    value={society.id || society._id}
                  >
                    {society.name}
                  </option>
                ))}
              </select>

              <select
                name="buildingId"
                value={formData.buildingId}
                onChange={handleInputChange}
                className="md:col-span-4 h-11 px-4 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900"
              >
                <option value="">
                  {buildingsLoading
                    ? "Loading Buildings..."
                    : "Select Wing / Building"}
                </option>
                {buildingsData?.data?.map((building) => (
                  <option
                    key={building.id || building._id}
                    value={building.id || building._id}
                  >
                    {building.name}
                  </option>
                ))}
              </select>

              <input
                name="unit"
                maxLength={6}
                value={formData.unit}
                onChange={handleInputChange}
                className="md:col-span-3 h-11 px-4 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
                placeholder="Unit (6 char)"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {(["owner", "tenant"] as const).map((type) => (
                <div
                  key={type}
                  onClick={() => setRole(type)}
                  className={`group flex-1 p-5 rounded-2xl border cursor-pointer transition-all duration-200
                  ${
                    role === type
                      ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
                      : "border-neutral-200 bg-white hover:bg-orange-50 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className={`font-bold text-sm capitalize transition-colors ${role === type ? "text-orange-600" : "text-neutral-900 group-hover:text-black"}`}
                      >
                        {type}
                      </p>
                      <p
                        className={`text-xs mt-1.5 transition-colors leading-relaxed ${role === type ? "text-neutral-600" : "text-neutral-400 group-hover:text-black"}`}
                      >
                        {type === "owner"
                          ? "Full access resident with structural privileges."
                          : "Lease-based community occupant account."}
                      </p>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ml-3 ${role === type ? "bg-orange-500 text-white shadow-sm" : "bg-neutral-50 text-neutral-400"}`}
                    >
                      {type === "owner" ? (
                        <ShieldCheck size={18} />
                      ) : (
                        <Home size={18} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-center">
                <HeartHandshake className="text-orange-600" size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-black">
                  Emergency Contact
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Primary point of contact for urgent scenarios.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleInputChange}
                maxLength={30}
                className="h-11 px-4 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
                placeholder="Name"
              />
              <input
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleInputChange}
                maxLength={20}
                className="h-11 px-4 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
                placeholder="Relation"
              />
              <input
                name="emergencyPhone"
                type="tel"
                maxLength={10}
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                className="md:col-span-2 h-11 px-4 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
                placeholder="Phone Number (10 digits)"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-neutral-400 font-medium">
              Data strictly encrypted via ISO/IEC 27001 operational workflows.
            </p>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={Discard}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 h-11 text-sm font-semibold border border-neutral-200 rounded-xl bg-white text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Discard
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 h-11 text-sm font-semibold bg-orange-500 text-white rounded-xl transition-colors shadow-sm hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering..." : "Register Resident"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResident;
