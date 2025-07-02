import React from 'react';
import Calculator from '../components/calculator/Calculator';
import MarketDataSection from '../components/market-data/MarketDataSection';

const RealEstate: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 pt-32 pb-8">
        <h1 className="text-4xl font-bold mb-8">Real Estate</h1>
        <Calculator />
        <div className="my-12" />
        <MarketDataSection />
      </div>
    </>
  );
};

export default RealEstate; 