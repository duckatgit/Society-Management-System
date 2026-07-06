interface TransactionCardProps {
  icon: React.ReactNode;
  title: string;
  plan: string;
  money: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

const SectionCard = ({
  icon,
  title,
  plan,
  money,
  date,
  status,
}: TransactionCardProps) => {
  const statusStyle = {
    Completed: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-orange-100 text-orange-700 border-orange-200",
    Failed: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#F2F4F6] rounded-xl p-4 mt-3 w-full  gap-4 shadow-sm border border-gray-100/50 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 bg-white text-gray-700 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
          <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-800 truncate">{title}</h3>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
            {plan}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200/60">
        <div className="text-left sm:text-right">
          <p className="text-sm font-bold text-gray-900 tracking-tight">
            {money}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{date}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold border shrink-0 uppercase tracking-wide ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default SectionCard;
