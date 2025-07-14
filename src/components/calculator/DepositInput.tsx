import React from 'react';
import { useTypography } from '../../hooks/useTypography';

interface DepositInputProps {
  value: number;
  onChange: (value: number) => void;
}

const DepositInput: React.FC<DepositInputProps> = ({ value, onChange }) => {
  const { getTypographyClasses } = useTypography();

  return (
    <div>
      <label className={`block text-sm text-gray-700 mb-3 ${getTypographyClasses('body')}`}>Initial Deposit</label>
      <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3">
        <span className={`text-2xl text-gray-700 mr-2 ${getTypographyClasses('body')}`}>SAR</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`flex-1 text-2xl text-gray-900 bg-transparent border-none outline-none ${getTypographyClasses('body')}`}
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default DepositInput; 