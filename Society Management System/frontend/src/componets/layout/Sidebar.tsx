import backgroundimage from "../../assets/bg.svg";
import { NavLink } from "react-router-dom";
import { useProfile } from "../../Hooks/GetProfile";
import { useSocietyProfile } from "../../Hooks/GetSocietyProfile";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menu: any[];
}

const Sidebar = ({ open, setOpen, menu }: SidebarProps) => {
  const role = localStorage.getItem("role");
  // console.log(localStorage.getItem("role"));

  const { data: adminProfile } = useProfile();
  const { data: societyProfile } = useSocietyProfile();

  const profile = role === "super_admin" ? adminProfile : societyProfile;
  // console.log("profile", adminProfile);
  // console.log("profile2", societyProfile);

  return (
    <div
      className={`
        fixed top-0 left-0
        h-screen
        w-60
        bg-black
        border-r border-slate-800
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
        z-50
      `}
    >
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 text-white lg:hidden"
      >
        ✕
      </button>

      <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-800">
        <img src={backgroundimage} className="w-10 h-10" alt="Logo" />
        <h1 className="text-orange-500 font-bold text-lg">Sunrise Residency</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-lg mt-2 transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="border-t border-slate-800 p-4">
        <p className="text-orange-500 font-semibold">{profile?.data?.name}</p>
      </div>
    </div>
  );
};

export default Sidebar;
