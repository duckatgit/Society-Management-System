import { Building, Eye, Pencil, Trash2, TriangleAlert, X } from "lucide-react";
import Card from "../../../componets/Card/Card";
import { buildingCards } from "../../../componets/Card/SocietyData";
import PageHeader from "../../../componets/layout/PageHeader";
import { useBuilding } from "../../../Hooks/GetBuilding";
import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useState } from "react";
import { useDeleteBuilding } from "../../../Hooks/deleteBuilding";
import { toast } from "react-toastify";
import { useUpdateBuilding } from "../../../Hooks/updateBuilding";

type BuildingDataType = {
  _id: string;
  name: string;
  towerCode: string;
  totalFloors: number;
  totalFlats: number;
  location: string;
  isActive?: boolean;
  societyId?: string;
};

type BuildingProps = React.ComponentProps<typeof PageHeader>;

export const BuildingContent = (props: BuildingProps) => {
  const [viewBuilding, setViewBuilding] = useState<BuildingDataType | null>(
    null,
  );
  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
  const [updateBuilding, setUpdateBuilding] = useState(false);

  const { data: building } = useBuilding();
  const { mutate } = useUpdateBuilding();
  const deleteMutation = useDeleteBuilding();
  const { data: societies } = useGetSocieties();

  const [formData, setFormData] = useState({
    name: "",
    towerCode: "",
    totalFloors: 0,
    totalFlats: 0,
    flatType: "",
    location: "",
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditId) return;

    mutate(
      {
        id: selectedEditId,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Building updated successfully");
          setUpdateBuilding(false);
          setSelectedEditId(null);
        },
        onError: () => {
          toast.error("Failed to update building");
        },
      },
    );
  };

  const handledelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Building Deleted Successfully");
      },
    });
  };

  const totalBuildings = building?.count ?? 0;

  const totalFloors =
    building?.data.reduce((sum, item) => sum + Number(item.totalFloors), 0) ??
    0;

  const totalFlats =
    building?.data.reduce((sum, item) => sum + Number(item.totalFlats), 0) ?? 0;

  return (
    <>
      <PageHeader {...props} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mt-4">
        {buildingCards(totalBuildings, totalFloors, totalFlats).map(
          (card, index) => (
            <Card key={index} {...card} />
          ),
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 mr-6 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr] bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-700 uppercase items-center">
          <p>Society</p>
          <p>Building / Tower</p>
          <p>Floors</p>
          <p>Total Flats</p>
          <p> Flats Type</p>
          <p>Status</p>
          <p>Location</p>
          <p className="text-center">Actions</p>
        </div>

        <div className="divide-y divide-gray-100">
          {building?.data?.map((build) => {
            const societyName = societies?.data.find(
              (society) => society._id === build.societyId,
            )?.name;

            return (
              <div
                key={build._id}
                className="grid  grid-cols-[2fr_2fr_1.5fr_2fr_1fr_1.5fr_1fr_1fr] items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200 gap-y-3 md:gap-y-0"
              >
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Building className="text-orange-500 shrink-0" size={20} />
                  <span>{societyName ?? "-"}</span>
                </p>

                <div>
                  <p className="font-semibold text-gray-900">{build.name}</p>
                  <p className="text-xs text-gray-500">{build.towerCode}</p>
                </div>
                <p className=" text-gray-500">{build.flatType}</p>

                <p className="text-purple-500">
                  <span className="inline-block text-xs font-medium text-gray-400 md:hidden mr-1">
                    Floors:
                  </span>
                  {build.totalFloors}
                </p>

                <p className="text-red-400">
                  <span className="inline-block text-xs font-medium text-gray-400 md:hidden mr-1">
                    Flats:
                  </span>
                  {build.totalFlats}
                </p>

                <div>
                  <span
                    className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${
                      build.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {build.isActive ? "Active" : "occupied"}
                  </span>
                </div>

                <div>
                  <p className="bg-orange-100 text-orange-600 w-20 text-center rounded-xl text-sm py-0.5">
                    {build.location}
                  </p>
                </div>

                <div className="flex justify-start md:justify-end items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t border-gray-100 md:border-none pr-2">
                  <button
                    type="button"
                    onClick={() => setViewBuilding(build)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <Eye size={18} className="text-blue-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handledelete(build._id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUpdateBuilding(true);
                      setSelectedEditId(build._id);
                      setViewBuilding(null);
                      setFormData({
                        name: build.name,
                        towerCode: build.towerCode,
                        totalFloors: Number(build.totalFloors),
                        totalFlats: Number(build.totalFlats),
                        flatType: build.flatType,
                        location: build.location,
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
        </div>

        {/* View Modal */}
        {viewBuilding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                    <TriangleAlert className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-950 leading-snug mt-0.5">
                      {viewBuilding.name}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewBuilding(null)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X className="size-5" />
                </button>
              </div>

              <hr className="border-gray-100" />

              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Tower Code
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {viewBuilding.towerCode || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {viewBuilding.location || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Total Floors
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {viewBuilding.totalFloors || 0} Floors
                  </p>
                </div>

                <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Total Flats
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {viewBuilding.totalFlats || 0} Units
                  </p>
                </div>
              </div>

              <hr className="border-gray-100 mb-4 mt-auto" />

              <div className="flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => setViewBuilding(null)}
                  className="bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {updateBuilding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-100 transform scale-100 transition-all">
              <div className="flex justify-between items-start gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-yellow-50 text-yellow-500 rounded-xl">
                    <Pencil className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Update Building
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Modify operational building parameters
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUpdateBuilding(false);
                    setSelectedEditId(null);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Building Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Tower A / Apex Heights"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Tower Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., T1"
                      value={formData.towerCode}
                      onChange={(e) =>
                        setFormData({ ...formData, towerCode: e.target.value })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Location / Wing
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., North Block"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Total Floors
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      value={formData.totalFloors}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalFloors: Number(e.target.value),
                        })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Total Flats
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      value={formData.totalFlats}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalFlats: Number(e.target.value),
                        })
                      }
                      className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateBuilding(false);
                      setSelectedEditId(null);
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-2.5 text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    Update Building
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
