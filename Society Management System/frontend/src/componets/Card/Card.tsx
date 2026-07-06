import React from "react";

type CardProps = {
  icon?: React.ReactNode;
  percentage?: string;
  title?: string;
  value?: string;
  className?: string;
};

const Card = ({
  icon,
  percentage = "",
  title = "",
  value = "",
  className = "",
}: CardProps) => {
  const isNegative = percentage?.startsWith("-");
  const isNeutral = percentage?.startsWith("0") || !percentage;

  const badgeStyles = isNeutral
    ? "text-slate-500 bg-slate-50 border-slate-200"
    : isNegative
      ? "text-rose-600 bg-rose-50/50 border-rose-100"
      : "text-emerald-600 bg-emerald-50/50 border-emerald-100";

  return (
    <div
      className={`group flex h-32 w-full flex-col justify-between -ml-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow transition-all duration-200 hover:bg-slate-50 hover:shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-500 transition-colors group-hover:bg-slate-100 group-hover:text-slate-700">
          <div className="h-6 w-6 flex items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
            {icon}
          </div>
        </div>
        {percentage && (
          <span
            className={`shrink-0 inline-flex items-center rounded-lg border px-4 py-1.5 text-[.8em] font-bold ${badgeStyles}`}
          >
            {percentage}
          </span>
        )}
      </div>

      <div className="min-w-0 flex flex-col mt-auto">
        <span className="text-[13px] font-semibold tracking-wider text-orange-600 uppercase text-center mt-1">
          {title}
        </span>
        <h4 className="text-xl font-semibold text-center tracking-tight text-slate-900 mt-0.5">
          {value}
        </h4>
      </div>
    </div>
  );
};

export default Card;
