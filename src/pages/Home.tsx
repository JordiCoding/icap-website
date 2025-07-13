import React from 'react';
import Hero from '../components/home/Hero';
import PortfolioSection from '../components/home/PortfolioSection';
import MutualFundsSection from '../components/home/MutualFundsSection';
import GlobalMarketsSection from '../components/home/GlobalMarketsSection';
import MarginLendingNewSection from '../components/home/MarginLendingNewSection';
import WhyAlistithmarSection from '../components/home/WhyAlistithmarSection';
import NewsroomSection from '../components/home/NewsroomSection';
import CtaSection from '../components/home/CtaSection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <PortfolioSection />
      <MutualFundsSection />
      <GlobalMarketsSection />
      <MarginLendingNewSection />
      <WhyAlistithmarSection />
      <NewsroomSection />
      <CtaSection />
      {/* The rest of the landing page sections will go here */}
    </>
  );
};

export default Home; 