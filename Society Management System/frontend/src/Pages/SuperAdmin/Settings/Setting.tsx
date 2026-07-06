import React, { useState, useRef } from "react";
import {
  User,
  Lock,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
  Sliders,
  Key,
} from "lucide-react";
import PageHeader from "../../../componets/layout/PageHeader";
import { useChangePass } from "../../../Hooks/ChangePass";
import { toast } from "react-toastify";
import { useUpdateProfile } from "../../../Hooks/UpdateProfile";

type settingProps = React.ComponentProps<typeof PageHeader>;
type TabType = "profile" | "security";

export const Setting = (props: settingProps) => {
  const { mutate: changePassword, isPending } = useChangePass();
  const { mutate: updateProfile } = useUpdateProfile();

  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Password Visibility States
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Form States
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle change for profile inputs
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for password inputs
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    const cleanName = profile?.name?.trim();
    const cleanEmail = profile?.email?.trim().toLowerCase();
    const cleanPhone = profile?.phone?.trim();

    // 1. Name Checks (Only text and 15 char limit)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!cleanName) {
      toast.error("Name is required");
      return;
    }
    if (!nameRegex.test(cleanName)) {
      toast.error("Name must contain only letters");
      return;
    }
    if (cleanName.length < 2 || cleanName.length > 15) {
      toast.error("Name must be between 2 and 15 characters");
      return;
    }

    if (!cleanEmail) {
      toast.error("Email is required");
      return;
    }
    if (cleanEmail.length > 30) {
      toast.error("Email cannot exceed 15 characters");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // 3. Phone Checks
    if (!cleanPhone) {
      toast.error("Phone number is required");
      return;
    }
    const numericPhone = cleanPhone.replace(/\D/g, "");
    if (numericPhone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Proceed with update...
    updateProfile({
      ...profile,
      name: cleanName,
      email: cleanEmail,
      phone: numericPhone,
    });
  };

  // Change Password Submit
  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasDigit) {
      toast.error(
        "Password must contain an uppercase letter, a lowercase letter, and a number",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password cannot be identical to your current password");
      return;
    }

    changePassword(
      {
        currentPassword,
        newPassword,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Password updated successfully!");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      },
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const inputClassName =
    "w-full border border-gray-200 rounded-xl px-3.5 h-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 text-sm bg-gray-50/40 hover:bg-gray-50/80 focus:bg-white text-gray-800 placeholder:text-gray-400 shadow-inner shadow-black/[0.01]";

  return (
    <>
      <PageHeader {...props} />
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24 space-y-6 -ml-4 mr-4 lg:ml-1 lg:mr-1 font-sans antialiased text-gray-900 selection:bg-orange-50 selection:text-orange-600">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="border border-gray-200/80 rounded-2xl p-1.5 bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex md:flex-col gap-1 p-2 overflow-x-auto md:overflow-visible pb-1.5 md:pb-0 scrollbar-none border-b md:border-b-0 border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex cursor-pointer items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold w-full ${
                  activeTab === "profile"
                    ? "bg-orange-50 text-orange-600 shadow-sm border border-orange-100/50"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Profile Details</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`flex items-center cursor-pointer gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold w-full ${
                  activeTab === "security"
                    ? "bg-orange-50 text-orange-600 shadow-sm border border-orange-100/50"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>Security & Password</span>
              </button>
            </div>

            <div className="hidden md:block pt-3 border-t border-gray-100 px-2 space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Profile Settings</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-gray-50/50 border border-gray-100 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Sliders className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span>Profile Setup</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100/50">
                    <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                    85% Complete
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-gray-50/50 border border-gray-100 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Key className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <span>Password Status</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md border border-green-100/50">
                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                    Verified Secure
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl max-w-2xl border border-gray-200/80 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.04)] p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100/50">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base text-gray-900 tracking-tight">
                      Profile Details
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Update your profile settings
                    </p>
                  </div>
                </div>

                {/* Avatar Section */}
                <div className="flex items-center gap-5 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 w-fit">
                  <div className="relative group">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden text-orange-600 font-bold text-lg shadow-sm transition group-hover:opacity-90">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar Token"
                          className="w-full h-full object-cover"
                        />
                      ) : profile.name ? (
                        profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      ) : (
                        "??"
                      )}
                    </div>
                    {/*<button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 bg-white border border-gray-200 text-gray-600 p-1.5 rounded-lg hover:text-orange-600 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>*/}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800">
                      Profile
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-normal"></p>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name Field */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold text-gray-500 tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      maxLength={15}
                      value={profile.name}
                      onChange={handleProfileChange}
                      className={inputClassName}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold text-gray-500 tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      maxLength={30}
                      value={profile.email}
                      onChange={handleProfileChange}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs font-bold text-gray-500 tracking-wider">
                      Contact
                    </label>
                    <input
                      type="text"
                      name="phone"
                      maxLength={10}
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs font-bold text-gray-500 tracking-wider">
                      Super Admin
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Super Admin"
                        disabled
                        className="w-full border border-gray-200 rounded-xl px-3.5 h-10 text-sm bg-gray-100 text-gray-400 cursor-not-allowed font-medium shadow-none"
                      />
                      <span className="absolute right-3 bg-gray-200/60 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                        Locked
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={handleUpdateProfile}
                    type="button"
                    className="h-9.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-2xl border border-gray-200/80 max-w-2xl shadow-[0_4px_12px_-4px_rgba(0,0,0,0.04)] p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100/50">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base text-gray-900 tracking-tight">
                      SECURITY & PASSWORDS
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Enforce verification checks to safely rotate
                      administrative access keys.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      label: "Current Password",
                      name: "currentPassword",
                      state: showCurrentPass,
                      setter: setShowCurrentPass,
                      value: passwordData.currentPassword,
                    },
                    {
                      label: "New Password",
                      name: "newPassword",
                      state: showNewPass,
                      setter: setShowNewPass,
                      value: passwordData.newPassword,
                    },
                    {
                      label: "Confirm New Password",
                      name: "confirmPassword",
                      state: showConfirmPass,
                      setter: setShowConfirmPass,
                      value: passwordData.confirmPassword,
                    },
                  ].map((input, idx) => (
                    <div key={idx}>
                      <label className="block mb-1.5 text-xs font-bold text-gray-500 tracking-wider">
                        {input.label}
                      </label>
                      <div className="relative">
                        <input
                          type={input.state ? "text" : "password"}
                          name={input.name}
                          maxLength={10}
                          value={input.value}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          className={inputClassName}
                        />
                        <button
                          type="button"
                          onClick={() => input.setter(!input.state)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors cursor-pointer"
                        >
                          {input.state ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={handleChangePassword}
                      className="h-9.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      {isPending ? "Saving..." : "Save New Password"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
