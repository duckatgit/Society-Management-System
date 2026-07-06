import {
  Megaphone,
  Check,
  Dot,
  ShieldCheck,
  Calendar,
  Pin,
  Tag,
  AlertCircle,
  Copy,
  CheckCheck,
  User,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AnnouncementSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [copiedText, setCopiedText] = useState("");

  const incomingPayload = location.state?.announcementData || {};
  const announcementData = incomingPayload.data || incomingPayload;

  const handleCopy = (textToCopy: string, fieldName: string) => {
    if (!textToCopy || textToCopy === "N/A") return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(fieldName);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 bg-slate-50 min-h-screen antialiased">
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Check size={32} className="text-white" />
        </div>
      </div>

      <div className="text-center max-w-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Announcement Dispatched Successfully
        </h2>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          The broadcast message payload has been successfully validated and
          pushed live into the system workspace feed parameters.
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Card 1: Core Content Stream */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Core Broadcast Payload
            </h3>
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                announcementData.status === "Published" ||
                !announcementData.status
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <Dot size={18} className="-ml-1" />
              {announcementData.status
                ? announcementData.status.toUpperCase()
                : "PUBLISHED"}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Announcement Title Header
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-gray-900 font-semibold text-base">
                <Megaphone
                  className="text-orange-500 bg-orange-50 p-1 rounded"
                  size={24}
                />
                {announcementData.title || "N/A"}
              </p>
            </div>

            <div className="border-t border-gray-100 my-1"></div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Broadcast Description Body
              </p>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-gray-700 text-sm leading-relaxed font-normal">
                {announcementData.description ||
                  "No description content body provided."}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Target Scope & Profile Properties
            </h3>
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Societies
                </p>
                <p className="mt-1.5 text-gray-900 font-medium text-sm">
                  {announcementData.society || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Originator Profile
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-emerald-700 bg-emerald-50/60 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize w-fit">
                  <ShieldCheck className="text-emerald-600" size={14} />
                  SuperAdmin Workspace
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-1"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Category Classification
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg text-xs font-semibold w-fit">
                  <Tag size={13} />
                  {announcementData.category || "General"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Priority Layer
                </p>
                <p
                  className={`mt-2 flex items-center gap-1.5 border px-2.5 py-1 rounded-lg text-xs font-semibold w-fit ${
                    announcementData.priority === "Critical" ||
                    announcementData.priority === "High"
                      ? "bg-red-50 text-red-700 border-red-100"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}
                >
                  <AlertCircle size={13} />
                  {announcementData.priority || "Medium"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Feed Pinning Flag
                </p>
                <p
                  className={`mt-2 flex items-center gap-1.5 border px-2.5 py-1 rounded-lg text-xs font-semibold w-fit ${
                    announcementData.isPinned
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  <Pin
                    size={13}
                    className={
                      announcementData.isPinned ? "fill-amber-500" : ""
                    }
                  />
                  {announcementData.isPinned
                    ? "Pinned to Top"
                    : "Standard Sequence"}
                </p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-100 my-1"></div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Recipient Target Routing Matrix (`sendTo`)
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {announcementData.sendTo &&
                announcementData.sendTo.length > 0 ? (
                  announcementData.sendTo.map(
                    (recipient: string, index: number) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-700 font-mono"
                      >
                        {recipient}
                      </span>
                    ),
                  )
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No direct targets configured.
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 my-1"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Author Metadata Document Identity (`createdBy`)
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-600 bg-gray-50 px-2.5 py-1 rounded border border-gray-200 font-medium">
                    {announcementData.createdBy || "N/A"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(announcementData.createdBy, "authorId")
                    }
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition"
                  >
                    {copiedText === "authorId" ? (
                      <CheckCheck size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              {announcementData.AttachmentUrl && (
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Linked Attachment Endpoint URI
                  </p>
                  <a
                    href={announcementData.AttachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium transition"
                  >
                    <Eye size={14} />
                    View Linked File Assets
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Registry System Metadata Indices */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center text-gray-500">
            <div className="p-4">
              <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                Database Record reference (`_id`)
              </span>
              <span className="font-mono text-gray-600 font-semibold block mt-1 truncate px-2">
                {announcementData._id || "N/A"}
              </span>
            </div>
            <div className="p-4">
              <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                Schedule Activation Window
              </span>
              <span className="font-medium text-gray-700 mt-1 flex items-center justify-center gap-1">
                <Calendar size={13} className="text-gray-400" />
                {announcementData.publishDate
                  ? new Date(announcementData.publishDate).toLocaleDateString()
                  : "Immediate"}
                {" → "}
                {announcementData.expiryDate
                  ? new Date(announcementData.expiryDate).toLocaleDateString()
                  : "Permanent"}
              </span>
            </div>
            <div className="p-4">
              <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                Active Index Flags
              </span>
              <span className="font-mono font-bold text-gray-600 block mt-1">
                {announcementData.isActive ? "ACTIVE_STREAM" : "INACTIVE_HOLD"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <User className="text-orange-500" size={16} />
            <p className="text-xs text-gray-600 font-medium">
              Profile Scope Authentication: SuperAdmin Dashboard Context
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
              onClick={() => navigate("/super-admin/Announcement")}
              className="flex-1 sm:flex-initial px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm transition font-medium cursor-pointer shadow-sm"
            >
              View Feed List →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSuccess;
