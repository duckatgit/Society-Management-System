import {
  Building2,
  Check,
  Dot,
  Hash,
  Layers,
  Home,
  MapPin,
  Copy,
  CheckCheck,
  User,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const BuildingSuccessfully = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [copiedText, setCopiedText] = useState("");

  const incomingPayload = location.state?.buildingData || {};
  const buildingData = incomingPayload.data || incomingPayload;

  const handleCopy = (textToCopy: string, fieldName: string) => {
    if (!textToCopy || textToCopy === "N/A") return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(fieldName);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="relative flex flex-col items-center px-4 py-1 bg-slate-50/50 min-h-screen antialiased selection:bg-orange-100 selection:text-orange-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)]  background-size: 24px 24px pointer-events-none" />

      <div className="relative w-full max-w-3xl flex flex-col gap-8">
        <div className="text-center flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-5">
            <div className="absolute animate-ping inline-flex h-16 w-16 rounded-full bg-emerald-400 opacity-20"></div>
            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Check size={28} className="text-white stroke-[2.5]" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-600 tracking-tight sm:text-4xl">
            Building Registered Successfully
          </h2>
          <p className="mt-3 text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            The building configuration has been validated, indexed, and is now
            active across your ecosystem.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <ShieldCheck size={14} className="text-slate-400" /> Core Identity
              Identity
            </h3>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <Dot
                size={20}
                className="-ml-1.5 animate-pulse text-emerald-500"
              />
              LIVE & ACTIVE
            </span>
          </div>

          <div className="p-6 flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Building Name
              </span>
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                <div className="bg-orange-50 p-2 rounded-xl border border-orange-100">
                  <Building2 className="text-orange-600" size={20} />
                </div>
                <span>{buildingData.name || "Untitled Building"}</span>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Tower Code Identifier
                </span>
                <div className="flex items-center gap-1.5">
                  <Hash size={15} className="text-slate-400" />
                  <code className="font-mono bg-slate-50 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 text-xs font-semibold tracking-tight">
                    {buildingData.towerCode || "N/A"}
                  </code>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Geographic Location Anchor
                </span>
                <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
                  <MapPin size={15} className="text-rose-500 shrink-0" />
                  <span>
                    {buildingData.location || "No Location Configured"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Ecosystem Capacity Mapping
            </h3>
          </div>

          <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/60 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Total Floor
                </span>
                <div className="flex items-center gap-2 mt-1 text-indigo-700 font-bold text-sm">
                  <Layers size={15} className="text-indigo-500" />
                  <span>
                    {buildingData.totalFloors
                      ? `${buildingData.totalFloors} Floors Allocated`
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/60 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  Total Units / Flats
                </span>
                <div className="flex items-center gap-2 mt-1 text-blue-700 font-bold text-sm">
                  <Home size={15} className="text-blue-500" />
                  <span>
                    {buildingData.totalFlats
                      ? `${buildingData.totalFlats} Flats Indexed`
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100/60 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                  Parent Workspace Identity
                </span>
                <div className="flex items-center mt-1 text-amber-800 font-mono text-xs font-bold tracking-tight">
                  ID: {buildingData.societyId || "N/A"}
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                System Registry Entity Record (`_id`)
              </span>
              <div className="inline-flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-200/80 rounded-lg">
                <code className="text-xs font-mono text-slate-600 px-2 font-semibold">
                  {buildingData._id || "N/A"}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(buildingData._id, "buildingId")}
                  className="p-1.5 hover:bg-white active:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition border border-transparent hover:border-slate-200 shadow-none hover:shadow-sm"
                  title="Copy Document ID"
                >
                  {copiedText === "buildingId" ? (
                    <CheckCheck
                      size={14}
                      className="text-emerald-600 stroke-[2.5]"
                    />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5 self-start sm:self-auto text-slate-600">
            <User className="text-slate-400" size={16} />
            <span className="text-xs font-semibold tracking-tight">
              Authenticated Scope:{" "}
              <span className="text-slate-900 font-bold">
                Society Admin Context
              </span>
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("/society-admin/dash")}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 text-sm transition-all duration-200 cursor-pointer hover:border-slate-300"
            >
              <ArrowLeft
                size={15}
                className="text-slate-400 group-hover:-translate-x-0.5 transition-transform"
              />
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate("/super-admin/buildings")}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 text-sm transition-all duration-200 cursor-pointer shadow-sm shadow-orange-600/10 hover:shadow-md hover:shadow-orange-600/20 active:scale-[0.99]"
            >
              View Buildings List
              <ArrowRight
                size={15}
                className="text-orange-200 group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
