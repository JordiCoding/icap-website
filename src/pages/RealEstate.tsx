import React from 'react';
import { useTypography } from '../hooks/useTypography';
import Calculator from '../components/calculator/Calculator';
import MarketDataSection from '../components/market-data/MarketDataSection';

const RealEstate: React.FC = () => {
  const { getTypographyClasses } = useTypography();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[320px] md:h-[400px] flex items-center justify-center bg-cover bg-center mb-8"
        style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className={`relative z-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg ${getTypographyClasses('title')}`}>AI Playground exploration</h1>
      </div>
      {/* Calculator Section */}
      <Calculator />
      {/* Global Markets Section */}
      <MarketDataSection />
    </div>
  );
};

export default RealEstate; 