import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTypography } from '../../hooks/useTypography';
import { useMarketStore } from '../../stores/useMarketStore';
import MarketCard from './MarketCard';
import TextBlock from '../common/TextBlock';

const MarketDataSection: React.FC = () => {
  const { getTypographyClasses } = useTypography();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { markets, isLoading, error, fetchAllData } = useMarketStore();
  useEffect(() => {
    fetchAllData();
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
              <span className={`text-red-800 ${getTypographyClasses('body')}`}>{error}</span>
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
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-8"
        >
          <p className={`text-sm text-gray-500 ${getTypographyClasses('body')}`}>
            Market data updates every 15 minutes during trading hours
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketDataSection; 