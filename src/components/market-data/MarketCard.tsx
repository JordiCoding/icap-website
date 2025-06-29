import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MarketCardProps } from '../../types/market';
import clsx from 'clsx';

const MarketCard: React.FC<MarketCardProps> = ({ data, isLoading = false, error }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <MarketCardSkeleton />;
  }

  if (error && (data.symbol === 'SP500' || data.symbol === 'NASDAQ')) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md border border-red-200">
        <div className="text-red-600 text-sm font-medium">
          {t('common.error')}: {error}
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${formatPrice(change)}`;
  };

  const formatChangePercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-icap-primary">{data.symbol}</h3>
          <p className="text-sm text-gray-600">{data.name}</p>
        </div>
        <div className="text-right">
          <span className={clsx(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
            data.dataSource === 'live' && 'bg-green-100 text-green-800',
            data.dataSource === 'delayed' && 'bg-yellow-100 text-yellow-800',
            data.dataSource === 'mock' && 'bg-gray-100 text-gray-800'
          )}>
            {data.dataSource === 'live' && t('market.live')}
            {data.dataSource === 'delayed' && t('market.delayed')}
            {data.dataSource === 'mock' && t('market.mock')}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="text-2xl font-bold text-icap-primary">
          ${formatPrice(data.price)}
        </div>
      </div>

      {/* Change */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className={clsx(
            'text-sm font-medium',
            data.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {formatChange(data.change)}
          </span>
          <span className={clsx(
            'text-sm font-medium',
            data.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            ({formatChangePercent(data.changePercent)})
          </span>
        </div>
        
        {/* Arrow indicator */}
        <div className={clsx(
          'w-6 h-6 flex items-center justify-center rounded-full',
          data.isPositive ? 'bg-green-100' : 'bg-red-100'
        )}>
          <svg
            className={clsx(
              'w-4 h-4',
              data.isPositive ? 'text-green-600' : 'text-red-600'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {data.isPositive ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            )}
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 border-t pt-3">
        {t('market.lastUpdated')}: {formatLastUpdated(data.lastUpdated)}
      </div>
    </div>
  );
};

// Skeleton loading component
const MarketCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-12"></div>
      </div>

      {/* Price skeleton */}
      <div className="mb-3">
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>

      {/* Change skeleton */}
      <div className="flex justify-between items-center mb-3">
        <div className="space-y-1">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>

      {/* Footer skeleton */}
      <div className="border-t pt-3">
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default MarketCard; 