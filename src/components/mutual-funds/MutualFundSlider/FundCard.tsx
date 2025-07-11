import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { FundCardProps } from './types';

const RISK_STYLES = {
  low: {
    bg: 'bg-[#EAFAF3]',
    text: 'text-[#1F9D61]'
  },
  medium: {
    bg: 'bg-[#FEF5E7]',
    text: 'text-[#F39C12]'
  },
  high: {
    bg: 'bg-[#FEECEC]',
    text: 'text-[#E74C3C]'
  }
} as const;

export function FundCard({
  title,
  description,
  riskLevel,
  isShariaCompliant,
  icon,
  className
}: FundCardProps) {
  const { t } = useTranslation();
  const riskStyle = RISK_STYLES[riskLevel];

  return (
    <div 
      className={clsx(
        "w-[330px] h-[454px]",
        "bg-white",
        "rounded-[20px]",
        "border border-[#E5E7EB]",
        "hover:scale-[1.02]",
        "transition-transform duration-300",
        "p-8",
        "flex flex-col",
        "cursor-pointer",
        className
      )}
    >
      {/* Icon */}
      <div className="mb-6">
        {icon?.url ? (
          <img src={icon.url} alt="" className="w-12 h-12" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-lg" /> // Placeholder
        )}
      </div>

      {/* Title and Description */}
      <div className="mb-8">
        <h3 className="text-2xl font-medium text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-base text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Risk Level */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            {t('mutualFunds.riskLevel')}
          </span>
          <span className={clsx(
            "px-3 py-1 rounded-full text-sm font-medium",
            riskStyle.bg,
            riskStyle.text
          )}>
            {t(`mutualFunds.risk.${riskLevel}`)}
          </span>
        </div>

        {/* Sharia Compliant Badge */}
        {isShariaCompliant && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3334 4L6.00008 11.3333L2.66675 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('mutualFunds.shariaCompliant')}
          </div>
        )}
      </div>
    </div>
  );
} 