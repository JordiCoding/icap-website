import React from 'react';
import { BrokerageHero, BrokerageProducts, TradeYourWaySection } from '../components/shared';
import { CtaSection } from '../../../modules/home/components';

const Brokerage: React.FC = () => {
  return (
    <>
      <BrokerageHero />
      <BrokerageProducts />
      <TradeYourWaySection />
      <CtaSection />
    </>
  );
};

export default Brokerage; 