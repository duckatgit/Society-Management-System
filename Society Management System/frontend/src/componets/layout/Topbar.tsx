import { BellRing, LogOut, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useProfile } from "../../Hooks/GetProfile";
import { useSocietyProfile } from "../../Hooks/GetSocietyProfile";

interface TopbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar: React.FC<TopbarProps> = ({ setOpen }) => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  // console.log(localStorage.getItem("role"));

  const { data: adminResponse } = useProfile();
  const { data: societyResponse } = useSocietyProfile();

  const profile =
    role === "super_admin" ? adminResponse?.data : societyResponse?.data;

  const handleLogout = () => {
    localStorage.clear();

    toast.success("Logged Out Successfully", {
      style: {
        background: "#16a34a",
        color: "#ffffff",
      },
    });

    navigate("/");
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 z-40 h-16 bg-white border-b border-slate-200 shadow-sm">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-3 w-full max-w-md">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 lg:hidden text-slate-700"
          >
            ☰
          </button>

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search..."
              className="w-full h-11 rounded-xl bg-slate-100 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              navigate(
                role === "super_admin"
                  ? "/super-admin/announcement"
                  : "/society-admin/announcements",
              )
            }
            className="p-2 rounded-xl hover:bg-slate-100 transition text-slate-600"
          >
            <BellRing size={20} />
          </button>

          <button
            onClick={() =>
              navigate(
                role === "super_admin"
                  ? "/super-admin/settings"
                  : "/society-admin/settings",
              )
            }
            className="p-2 rounded-xl hover:bg-slate-100 transition text-slate-600"
          >
            <Settings size={20} />
          </button>

          <div className="h-8 w-px bg-slate-200" />

          <div className="relative">
            <button
              onClick={() => setLogout(!logout)}
              className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-100 transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                {profile?.name?.charAt(0).toUpperCase() || "?"}
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-orange-500">
                  {profile?.name || "Loading..."}
                </p>

                <p className="text-xs text-slate-400 capitalize">
                  {role?.replace("_", " ")}
                </p>
              </div>
            </button>

            {logout && (
              <div className="absolute right-0 top-14 w-40 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-3 text-orange-500 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
