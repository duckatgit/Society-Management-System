import React from "react";
import { useNavigate } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type PageHeaderProps = {
  title?: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  primaryButtonText?: string;
  activityButtonText?: string;
  activityButtonIcon?: React.ReactNode;
  onPrimaryClick?: () => void;
  onActivityClick?: () => void;
  showActivityButton?: boolean;
  primaryButtonIcon?: React.ReactNode;
  isPrimaryActive?: boolean;
};

const PageHeader = ({
  title,
  description,
  breadcrumb = [],
  primaryButtonText,
  activityButtonText,
  showActivityButton = true,
  primaryButtonIcon,
  activityButtonIcon,
  onPrimaryClick,
  onActivityClick,
  isPrimaryActive = true,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-auto px-4 shadow z-50 sm:px-6 lg:px-8 py-4 bg-white/60  mr-8 backdrop-blur-md border-b border-gray-100 rounded-2xl space-y-3.5 transition-all duration-300">
      {breadcrumb.length > 0 && (
        <nav
          className="flex flex-wrap items-center gap-1  text-xs tracking-wide uppercase font-semibold text-gray-400"
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => item.path && navigate(item.path)}
                className={`transition-colors max-w-[12em] truncate py-0.5 rounded ${
                  item.path
                    ? "text-gray-500 hover:text-orange-500 cursor-pointer font-bold"
                    : "text-gray-400 font-medium cursor-default"
                }`}
                disabled={!item.path}
              >
                {item.label}
              </button>

              {index < breadcrumb.length - 1 && (
                <span className="text-gray-300 font-normal text-sm px-0.5 select-none">
                  /
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1 max-w-4xl -mt-2">
          {title && (
            <h1 className="text-black text-xl sm:text-2xl lg:text-2xl font-semibold tracking-tight  bg-clip-text ">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Action Controls Panel */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto shrink-0">
          {showActivityButton && (
            <button
              type="button"
              onClick={onActivityClick}
              className="h-9.5 px-3.5 flex items-center justify-center gap-2 bg-white border border-gray-200/80 shadow-sm rounded-xl text-xs font-semibold text-gray-700 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50/10 active:scale-[0.98] transition-all w-full sm:w-auto cursor-pointer"
            >
              {activityButtonIcon && (
                <span className="text-gray-400 hover:text-orange-500 transition-colors">
                  {activityButtonIcon}
                </span>
              )}
              <span>{activityButtonText}</span>
            </button>
          )}

          {primaryButtonText && (
            <button
              type="button"
              onClick={onPrimaryClick}
              disabled={!isPrimaryActive}
              className={`h-9.5 px-4 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all w-full sm:w-auto
                ${
                  isPrimaryActive
                    ? "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer"
                    : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
            >
              {primaryButtonIcon}
              <span>{primaryButtonText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
