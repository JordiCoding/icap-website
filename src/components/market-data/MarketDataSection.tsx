import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMarketStore } from '../../stores/useMarketStore';
import MarketCard from './MarketCard';
import TextBlock from '../common/TextBlock';

const MarketDataSection: React.FC = () => {
  const { t } = useTranslation();
  const { markets, isLoading, error, lastUpdated, fetchAllData } = useMarketStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Set up auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, [fetchAllData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <TextBlock
            title="Explore Market Data"
            subtitle="Track real-time performance of key markets across the globe."
            className="max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Market Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {markets.map((market) => (
            <motion.div key={market.symbol} variants={itemVariants}>
              <MarketCard
                data={market}
                isLoading={isLoading}
                error={error || undefined}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Last Updated Info */}
        {lastUpdated && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500">
              {t('market.lastUpdated')}: {new Date(lastUpdated).toLocaleString()}
            </p>
          </motion.div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center text-sm text-gray-500">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-icap-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('market.updating')}...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDataSection; 