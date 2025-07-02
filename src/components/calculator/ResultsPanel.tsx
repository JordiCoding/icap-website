import React from 'react';

interface ResultsPanelProps {
  value: number;
  cagr: number;
  dividends: number;
  period: string;
  showDividends?: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ value, cagr, dividends, period, showDividends = false }) => {
  return (
    <div className="bg-gray-100 rounded p-4 mb-4 flex flex-col gap-2">
      <div className="text-2xl font-bold">SAR {value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
      <div className="text-gray-600 text-sm">Fund is calculated on {period} past average return</div>
      <div className="flex gap-6 mt-2">
        <div>
          <div className="text-xs text-gray-500">Average annual return</div>
          <div className="font-semibold">{(cagr * 100).toFixed(2)}%</div>
        </div>
        {showDividends && (
          <div>
            <div className="text-xs text-gray-500">Dividends Earned</div>
            <div className="font-semibold">SAR {dividends.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel; 