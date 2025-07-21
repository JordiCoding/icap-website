import React from 'react';
import { useTypography } from '../../hooks/useTypography';
import type { MarketData } from '../../types/market';

interface MarketCardProps {
  data: MarketData;
  isLoading?: boolean;
  error?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ data, isLoading, error }) => {
  const { getTypographyClasses } = useTypography();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className={`text-red-600 text-sm ${getTypographyClasses('body')}`}>
          Error loading market data
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  const isPositive = data.change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeIcon = isPositive ? '↑' : '↓';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg text-icap-primary ${getTypographyClasses('title')}`}>{data.symbol}</h3>
          <p className={`text-sm text-gray-600 ${getTypographyClasses('body')}`}>{data.name}</p>
        </div>
        <div className={`
          inline-flex items-center px-2 py-1 rounded-full text-xs ${getTypographyClasses('body')}
          ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        `}>
          {changeIcon} {Math.abs(data.changePercent).toFixed(2)}%
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-sm text-gray-600 ${getTypographyClasses('body')}`}>Current Price</span>
          <div className={`text-2xl text-icap-primary ${getTypographyClasses('title')}`}>
            ${data.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm text-gray-600 ${getTypographyClasses('body')}`}>Change</span>
          <div className={`text-sm ${changeColor} ${getTypographyClasses('body')}`}>
            {isPositive ? '+' : ''}${data.change.toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm text-gray-600 ${getTypographyClasses('body')}`}>Last Updated</span>
          <div className={`text-sm text-gray-600 ${getTypographyClasses('body')}`}>
            {new Date(data.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard; 