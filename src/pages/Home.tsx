import React from 'react';
import Hero from '../components/home/Hero';
import MarginLendingSection from '../components/home/MarginLendingSection';
import PortfolioSection from '../components/home/PortfolioSection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <PortfolioSection />
      <MarginLendingSection />
      {/* The rest of the landing page sections will go here */}
    </>
  );
};

export default Home; 