import React from 'react';
import { useTypography } from '../../hooks/useTypography';

interface ResultsPanelProps {
  totalValue: number;
  totalGain: number;
  initialDeposit: number;
  timeframe: string;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ totalValue, totalGain, initialDeposit, timeframe }) => {
  const { getTypographyClasses } = useTypography();

  return (
    <div className="bg-[#FBF7F1] p-6 rounded-lg">
      <div className="mb-6">
        <div className={`text-4xl md:text-5xl text-gray-900 mb-2 ${getTypographyClasses('title')}`}>
          SAR {totalValue.toLocaleString()}
        </div>
        <div className={`text-gray-600 ${getTypographyClasses('body')}`}>
          Total Value After {timeframe}
        </div>
      </div>
      
      <div className="mb-6">
        <div className={`text-2xl text-gray-900 ${getTypographyClasses('title')}`}>
          +SAR {totalGain.toLocaleString()}
        </div>
        <div className={`text-gray-600 ${getTypographyClasses('body')}`}>
          Total Gain
        </div>
      </div>
      
      <div className="mb-6">
        <div className={`text-2xl text-gray-900 ${getTypographyClasses('title')}`}>
          {((totalGain / initialDeposit) * 100).toFixed(1)}%
        </div>
        <div className={`text-gray-600 ${getTypographyClasses('body')}`}>
          Total Return
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel; 