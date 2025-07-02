import React from 'react';

interface DepositInputProps {
  value: number;
  onChange: (value: number) => void;
}

const DepositInput: React.FC<DepositInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Initial Deposit</label>
      <input
        type="number"
        className="w-full border rounded px-3 py-2 text-lg"
        value={value}
        min={0}
        step={100}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default DepositInput; 