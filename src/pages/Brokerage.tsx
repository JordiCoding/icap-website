import React from 'react';
import { BrokerageHero, BrokerageProducts } from '../components/brokerage';
import CtaSection from '../components/home/CtaSection';

const Brokerage: React.FC = () => {
  return (
    <>
      <BrokerageHero />
      <BrokerageProducts />
      <CtaSection />
    </>
  );
};

export default Brokerage; 