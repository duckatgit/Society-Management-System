import {
  Check,
  Dot,
  UserRound,
  Home,
  Phone,
  IdCard,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResidentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4 py-2">
      <div className="flex items-center justify-center mb-6 animate-pulse">
        <div className="w-24 h-24 rounded-2xl bg-green-100 flex items-center justify-center ring-4 ring-green-50">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <Check size={28} className="text-white" />
          </div>
        </div>
      </div>

      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900">
          Resident Added Successfully
        </h2>

        <p className="mt-2 text-gray-600">
          The resident profile has been created and linked to the selected unit.
          They can now access community services and notifications.
        </p>
      </div>

      <div className="mt-8 w-full max-w-3xl bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50">
          <h3 className="text-sm font-semibold tracking-wide text-gray-700">
            RESIDENT DETAILS
          </h3>

          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full text-green-600 text-sm font-medium">
            <Dot size={18} />
            ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <p className="text-xs font-medium text-gray-500">RESIDENT NAME</p>
            <p className="mt-1 flex items-center gap-2 text-gray-900 font-medium">
              <UserRound className="text-orange-500" size={18} />
              Nikhil Thakur
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">CONTACT NUMBER</p>
            <p className="mt-1 flex items-center gap-2 text-gray-900 font-medium">
              <Phone className="text-green-500" size={18} />
              +91 98765 43210
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">UNIT DETAILS</p>
            <p className="mt-1 flex items-center gap-2 text-gray-900 font-medium">
              <Home className="text-blue-500" size={18} />
              Wing A • Unit 1204
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">RESIDENT ID</p>
            <p className="mt-1 flex items-center gap-2 text-gray-900 font-medium">
              <IdCard className="text-purple-500" size={18} />
              RES-2025-1001
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <Sparkles className="text-orange-500" size={18} />
            <p className="text-sm text-gray-700">
              Next Step: Complete resident verification documents
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dash")}
              className="px-4 py-2 bg-white text-black rounded-lg hover:text-white text-sm hover:bg-orange-600 transition"
            >
              ← Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/super-admin/residents")}
              className="px-4 py-2 bg-white text-black rounded-lg hover:text-white text-sm hover:bg-orange-600 transition"
            >
              ← View Residents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentSuccess;
