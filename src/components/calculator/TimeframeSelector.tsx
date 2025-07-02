import React from 'react';

interface TimeframeOption {
  label: string;
  value: string;
}

interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: TimeframeOption[];
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex gap-2 mb-4">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`px-4 py-2 rounded border ${value === opt.value ? 'bg-black text-white' : 'bg-white text-black'}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector; 