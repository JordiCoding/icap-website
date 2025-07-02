import React from 'react';
import Hero from '../components/home/Hero';
import Calculator from '../components/calculator/Calculator';
import MarginLendingSection from '../components/home/MarginLendingSection';
import PortfolioSection from '../components/home/PortfolioSection';
import MarketDataSection from '../components/market-data/MarketDataSection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Calculator />
      <PortfolioSection />
      <MarginLendingSection />
      <MarketDataSection />
      {/* The rest of the landing page sections will go here */}
    </>
  );
};

export default Home; 