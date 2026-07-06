import { Mail, Lock, User, Phone } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            SR
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">Create Account</h1>
          <p className="mt-1 text-xs text-slate-500">
            Join the Sunrise Residency ecosystem today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1 mt-3 bg-slate-100 p-1 rounded-lg">
          <button className="flex  items-center justify-center  gap-1 bg-white text-orange-500 text-sm font-semibold py-1 rounded-md shadow-sm">
            <User size={14} />
            Admin
          </button>
        </div>

        {/* Form */}
        <form className="mt-4 space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Alexander Pierce"
                className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                placeholder="alexander@example.com"
                className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="tel"
                placeholder="+91 9876543210"
                className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-sm transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-orange-500 font-medium hover:text-orange-600"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
