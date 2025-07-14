import React from 'react';
import { useTypography } from '../hooks/useTypography';
import Calculator from '../components/calculator/Calculator';
import MarketDataSection from '../components/market-data/MarketDataSection';

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