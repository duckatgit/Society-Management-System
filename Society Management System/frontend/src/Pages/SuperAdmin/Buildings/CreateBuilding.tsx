import { Building, Building2, Hash, Layers, Home, MapPin } from "lucide-react";
import PageHeader from "../../../componets/layout/PageHeader";
import { useNavigate } from "react-router-dom";

export const CreateBuilding = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <form>
          <div className="sm:px-6 lg:px-8">
            <div className="w-full pb-8">
              <PageHeader
                breadcrumb={[
                  { label: "Building", path: "/society-admin/buildings" },
                  { label: "Create Building" },
                ]}
                title="Register New Building"
                description="Provide structural and administrative details to add a new building unit to the OmniSociety ecosystem."
                onPrimaryClick={() => navigate("")}
                primaryButtonText="Save Building"
                primaryButtonIcon={<Building />}
                showActivityButton={false}
              />
            </div>

            <div className="min-h-screen bg-slate-50 py-10 px-4">
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
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-slate-700">
                        Building ,lfmewnnfgwnaregawrb
                      </label>
                      <input
                        className="w-full border border-slate-300 rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none  focus:ring-orange-500 focus:border-orange-500"
                        type="text"
                        name="name"
                        placeholder="e.g. Skyline Towers"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Hash size={14} className="text-slate-400" />
                          Society ID
                        </label>
                        <input
                          className="w-full border border-slate-300 rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none  focus:ring-orange-500 focus:border-orange-500"
                          type="text"
                          name="societyId"
                          placeholder="e.g. SOC-123"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Hash size={14} className="text-slate-400" />
                          Tower Code
                        </label>
                        <input
                          className="w-full border border-slate-300 rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none  focus:ring-orange-500 focus:border-orange-500"
                          type="text"
                          name="towerCode"
                          placeholder="e.g. TWR-A"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Layers size={14} className="text-slate-400" />
                          Total Floors
                        </label>
                        <input
                          className="w-full border border-slate-300 rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none  focus:ring-orange-500 focus:border-orange-500"
                          type="number"
                          name="totalFloors"
                          min="1"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Home size={14} className="text-slate-400" />
                          Total Flats
                        </label>
                        <input
                          className="w-full border border-slate-300 rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none  focus:ring-orange-500 focus:border-orange-500"
                          type="number"
                          name="totalFlats"
                          min="1"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          Location
                        </label>
                        <input
                          className="w-full border border-slate-300 rounded-lg px-4 h-11 text-sm placeholder:text-slate-400 transition focus:outline-none  focus:ring-orange-500 focus:border-orange-500"
                          type="text"
                          name="location"
                          placeholder="Mohali"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => navigate("")}
                      className="px-5 py-2.5 text-sm font-medium cursor-pointer border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-medium cursor-pointer bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600 active:bg-orange-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
