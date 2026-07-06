import {
  Building2,
  Check,
  Dot,
  Gem,
  IdCard,
  ShieldCheck,
  MapPin,
  Mail,
  Home,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Copy,
  CheckCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Successfull = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State flags for interactive features
  const [showPassword, setShowPassword] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  // Grab the forwarded API response data packet safely (expecting the 'data' block from your JSON)
  const societyData = location.state?.societyData || {};
  const adminData = societyData.admin || {};

  // Grab the password value passed forward from the form's state context
  const rawPassword = location.state?.temporaryPassword || "********";

  const handleCopy = (textToCopy: string, fieldName: string) => {
    if (!textToCopy || textToCopy === "N/A") return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(fieldName);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 bg-slate-50 min-h-screen antialiased">
      {/* Success Notification Animation Header */}
      <div className="flex items-center justify-center mb-6 dynamic-bounce">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Check size={32} className="text-white stroke-width: 3" />
        </div>
      </div>

      <div className="text-center max-w-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Society & Admin Onboarded Successfully
        </h2>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          The new system portal workspace is online. Use the credentials below
          to log in and configure the portal properties.
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Card 1: Society Parameters Setup */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Society Core Settings
            </h3>
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                societyData.status === "Active" || !societyData.status
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <Dot size={18} className="-ml-1" />
              {societyData.status ? societyData.status.toUpperCase() : "ACTIVE"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Society Workspace Name
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-gray-900 font-medium text-sm">
                <Building2
                  className="text-orange-500 bg-orange-50 p-1 rounded"
                  size={24}
                />
                {societyData.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Classification Group
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-gray-900 font-medium text-sm">
                <Home
                  className="text-indigo-500 bg-indigo-50 p-1 rounded"
                  size={24}
                />
                {societyData.societyType || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Official Registration Id
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-gray-900 font-medium text-sm">
                <IdCard
                  className="text-blue-500 bg-blue-50 p-1 rounded"
                  size={24}
                />
                {societyData.registrationNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Tier License Assignment
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-gray-900 font-medium text-sm">
                <Gem
                  className="text-green-500 bg-green-50 p-1 rounded"
                  size={24}
                />
                {societyData.subscriptionPlan || "Standard"}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Generated Portal System Credentials */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Administrator Access Credentials
            </h3>
          </div>

          <div className="p-6 flex flex-col gap-5">
            {/* Added Section: Administrator Name & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Administrator Name
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-gray-900 font-medium text-sm">
                  <User
                    className="text-purple-500 bg-purple-50 p-1 rounded"
                    size={24}
                  />
                  {adminData.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Access Clearance Profile
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-emerald-700 bg-emerald-50/60 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize w-fit">
                  <ShieldCheck className="text-emerald-600" size={14} />
                  {adminData.role
                    ? adminData.role.replace("_", " ")
                    : "Society Admin"}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-1"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Registered Communication Email
                </p>
                <p className="mt-2 flex items-center gap-2 text-gray-900 text-sm font-medium">
                  <Mail className="text-gray-400" size={16} />
                  {adminData.email || societyData.address || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Temporary Profile Password
                </p>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-900 font-mono text-xs font-semibold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg tracking-wide">
                    <Lock size={13} className="text-gray-400" />
                    <span>{showPassword ? rawPassword : "••••••••••••"}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(rawPassword, "password")}
                      className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition"
                      title="Copy Password"
                    >
                      {copiedText === "password" ? (
                        <CheckCheck size={15} className="text-green-600" />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-100 my-1"></div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Admin User Object ID
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-xs font-mono text-gray-600 bg-gray-50 px-2.5 py-1 rounded border border-gray-200 font-medium">
                  {adminData._id || "N/A"}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(adminData._id, "adminId")}
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition"
                >
                  {copiedText === "adminId" ? (
                    <CheckCheck size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Registry System Metadata Indices */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center text-gray-500">
            <div className="p-4">
              <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                Database Document Index
              </span>
              <span className="font-mono text-gray-600 font-semibold block mt-1 truncate px-2">
                {societyData._id || "N/A"}
              </span>
            </div>
            <div className="p-4">
              <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                Onboard Registry Date
              </span>
              <span className="font-medium text-gray-700 mt-1 flex items-center justify-center gap-1">
                <Calendar size={13} className="text-gray-400" />
                {societyData.createdAt
                  ? new Date(societyData.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="p-4">
              <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                Schema Version Tag
              </span>
              <span className="font-mono font-bold text-gray-600 block mt-1">
                v{societyData.__v ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Action Utility Footer Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MapPin className="text-orange-500" size={16} />
            <p className="text-xs text-gray-600 font-medium">
              Region Cluster: {societyData.city || "N/A"},{" "}
              {societyData.country || "N/A"}
            </p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("/super-admin/dash")}
              className="flex-1 sm:flex-initial px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm transition font-medium cursor-pointer"
            >
              ← Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate("/super-admin/Societies")}
              className="flex-1 sm:flex-initial px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm transition font-medium cursor-pointer shadow-sm"
            >
              View Societies →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successfull;
