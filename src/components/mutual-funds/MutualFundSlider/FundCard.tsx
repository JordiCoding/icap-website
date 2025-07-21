import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useTypography } from '../../../hooks/useTypography';
import type { FundCardProps } from './types';
import type { IconAsset } from './types';

const RISK_STYLES = {
  low: {
    bg: 'bg-[#E0F0DD]', // Green
    text: 'text-black'
  },
  medium: {
    bg: 'bg-[#F9F3D5]', // Yellow
    text: 'text-black'
  },
  high: {
    bg: 'bg-[#F3D7D7]', // Red
    text: 'text-black'
  }
} as const;

export function FundCard({
  title,
  description,
  riskLevel,
  isShariaCompliant,
  icon,
  iconEn,
  className
}: FundCardProps) {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const riskStyle = RISK_STYLES[riskLevel];

  // Use icon from current locale, or fallback to English/default icon
  const iconUrl = icon?.url || iconEn?.url;

  return (
    <div 
      className={clsx(
        "w-[330px] h-[454px]",
        "bg-white",
        "rounded-[32px]",
        "border border-[#E5E7EB]",
        "hover:scale-[1.02]",
        "transition-transform duration-300",
        "flex flex-col cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Top section: Cream background and icon */}
      <div className="relative w-full flex flex-col items-center justify-center" style={{ height: '35%' }}>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: '#FAF6ED',
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
            zIndex: 1,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          {iconUrl ? (
            <img src={iconUrl} alt="" className="w-24 h-24 object-contain" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg" /> // Placeholder
          )}
        </div>
      </div>
      {/* Card content below top section */}
      <div className="flex-1 flex flex-col px-8 pb-8 pt-6">
        <h3 className={clsx(
          "mb-4 text-right font-bold text-gray-900",
          getTypographyClasses('title')
        )} style={{ fontSize: 20, lineHeight: '28px' }}>{title}</h3>
        {/* Badges Row */}
        <div className="flex flex-row items-center gap-3 mb-4">
          {/* Risk Badge */}
          <span className={clsx(
            "flex items-center justify-center px-4",
            riskStyle.bg,
            riskStyle.text,
            "rounded-[8px] h-8 text-[12px] font-medium",
            getTypographyClasses('body')
          )}>
            {t(`mutualFunds.risk.${riskLevel}`)}
          </span>
          {/* Sharia Compliant Badge */}
          {isShariaCompliant && (
            <span className={clsx(
              "flex items-center justify-center px-4 rounded-[8px] h-8 text-[12px] font-medium bg-[#FBF7F1] text-black gap-1",
              getTypographyClasses('body')
            )}>
              {t('mutualFunds.shariaCompliant')}
            </span>
          )}
        </div>
        {/* Description */}
        <p className={clsx(
          "text-right text-gray-600 leading-relaxed",
          getTypographyClasses('body')
        )} style={{ fontSize: 16, lineHeight: '26px' }}>{description}</p>
      </div>
    </div>
  );
}

export default FundCard; 