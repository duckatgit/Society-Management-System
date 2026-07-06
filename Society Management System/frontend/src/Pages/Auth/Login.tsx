import { useState, type FormEvent } from "react";
import backgroundimage from "../../assets/bg.svg";
import { Mail, Lock, Home, User, Shield, UserCog } from "lucide-react";
import screen from "../../assets/screen.png";
import { useNavigate } from "react-router-dom";
import { useLoginApi } from "../../Hooks/LoginApi";
import { toast } from "react-toastify";
import { useSocietyLogin } from "../../Hooks/LoginScoiety";

type Role = "admin" | "Society" | "owner" | "security";

const Login = () => {
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: Admin, isPending: isAdminPending } = useLoginApi();
  const { mutate: Society, isPending: isSocietyPending } = useSocietyLogin();

  const isPending = isAdminPending || isSocietyPending;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    if (role === "admin") {
      Admin({
        email,
        password,
      });
    } else if (role === "Society") {
      Society({
        email,
        password,
        role,
      });
    }
  };

  const goForget = () => {
    if (role === "admin") {
      navigate("/super-admin/forget");
    } else if (role === "Society") {
      navigate("/society-admin/forget");
    }
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${screen})` }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-sm max-h-[95vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-5">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 p-2 flex items-center justify-center">
              <img
                src={backgroundimage}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="text-center mt-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sunrise Residency
            </h1>
            <p className="mt-1 text-xs text-white/70">
              Sign in to continue your journey
            </p>
          </div>

          {/* Role Grid Toggles */}
          <div className="grid grid-cols-4 gap-1 mt-4 bg-black/20 border border-white/10 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                role === "admin"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <UserCog size={15} />
              <span className="text-[10px] mt-1">Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("Society")}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                role === "Society"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home size={15} />
              <span className="text-[10px] mt-1">Society</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                role === "owner"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <User size={15} />
              <span className="text-[10px] mt-1">Owner</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("security")}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                role === "security"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Shield size={15} />
              <span className="text-[10px] mt-1">Security</span>
            </button>
          </div>

          {/* Form handles inputs and actions globally */}
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="alexander@example.com"
                  className="w-full h-11 pl-10 pr-4 text-sm text-white placeholder:text-white/50 bg-white/5 border border-white/15 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-white">
                  Password
                </label>
                <button
                  type="button"
                  onClick={goForget}
                  className="text-[11px] text-orange-200 hover:text-orange-300 transition"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 text-sm text-white placeholder:text-white/50 bg-white/5 border border-white/15 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer">
                <input type="checkbox" className="accent-orange-500" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-xl cursor-pointer bg-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 transition-all duration-300 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Logging in..."
                : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>
          </form>

          <div className="mt-4 border-t border-white/10 pt-3">
            <p className="text-center text-xs text-white/70">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-semibold text-orange-300 hover:text-orange-200 transition"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
