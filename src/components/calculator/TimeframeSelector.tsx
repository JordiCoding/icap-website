import React from 'react';
import { useTypography } from '../../hooks/useTypography';

interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ value, onChange, options }) => {
  const { getTypographyClasses } = useTypography();

  return (
    <div className="space-y-3">
      <label className={`block text-sm text-gray-700 ${getTypographyClasses('body')}`}>Time Period</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${getTypographyClasses('body')} ${
              value === option.value
                ? 'bg-[#A44F17] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeframeSelector; 