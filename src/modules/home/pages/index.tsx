import React from 'react';
import {
  HeroSection,
  PortfolioSection,
  MutualFundsSection,
  GlobalMarketsSection,
  MarginLendingNewSection,
  WhyAlistithmarSection,
  NewsroomSection,
  CtaSection
} from '../components';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <PortfolioSection />
      <MutualFundsSection />
      <GlobalMarketsSection />
      <MarginLendingNewSection />
      <WhyAlistithmarSection />
      <NewsroomSection />
      <CtaSection />
    </>
  );
};

export default Home; 