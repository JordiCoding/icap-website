import React from 'react';
import { useTypography } from '../../../shared/hooks';
import Calculator from '../../../modules/calculator/Calculator';
import MarketDataSection from '../../../shared/components/market-data/MarketDataSection';

const RealEstate: React.FC = () => {
  const { getTypographyClasses } = useTypography();

  return (
    <div className="min-h-screen bg-white">
      {/* Calculator Section */}
      <Calculator />
      
      {/* Global Markets Section */}
      <MarketDataSection />
    </div>
  );
};

export default RealEstate; 