import { useState } from "react";
import backgroundimage from "../../assets/bg.svg";
import screen from "../../assets/screen.png";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useForgetApi from "../../Hooks/ForgetApi";

const Forget = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useForgetApi();

  const handleForget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    mutate({ email });
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${screen})` }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-5">
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
              Forgot Password
            </h1>

            <p className="mt-1 text-xs text-white/70 leading-relaxed">
              Enter your registered email address and we'll send you a password
              reset link.
            </p>
          </div>

          <form className="mt-5 space-y-3" onSubmit={handleForget}>
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@example.com"
                  required
                  className="w-full h-11 pl-10 pr-4 text-sm text-white placeholder:text-white/50 bg-white/5 border border-white/15 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-xl cursor-pointer bg-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 transition-all duration-300 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-4 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 text-xs font-medium text-orange-300 hover:text-orange-200 transition"
            >
              <ArrowLeft size={14} />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
