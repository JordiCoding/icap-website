import React, { useEffect } from 'react';
import { CtaSection } from '../../../modules/home/components';
import { Button } from '../../../shared/components/ui';
import { useLanguage } from '../../../shared/hooks';

const LocalMarket: React.FC = () => {
  const { isRTL } = useLanguage();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* Hero Section - Reusing BrokerageHero with custom background */}
      <div className="relative h-screen overflow-hidden flex items-center">
        {/* Background flipped conditionally */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/bsaudimarket.png)',
            transform: isRTL ? 'scaleX(-1)' : 'none',
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`
            max-w-2xl
            ${isRTL ? 'ml-auto text-right' : 'mr-auto text-left'}
          `}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
                style={{ fontFamily: 'Chap, sans-serif' }}>
              <span className="block">Local Market</span>
              <span className="text-white block sm:inline">Trading Opportunities</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 leading-relaxed max-w-xl"
               style={{ fontFamily: 'Jokker Light, sans-serif' }}>
              Access Tadawul-listed equities, sukuk, and IPOs with powerful tools and real-time insights tailored to local investors.
            </p>
            
                          <Button variant="primary" className="text-lg px-8 py-4">
                Open an Account
              </Button>
          </div>
        </div>
      </div>
      
      {/* Additional sections will be added here */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Local Market Features Coming Soon
          </h2>
        </div>
      </div>
      
      {/* CTA Section */}
      <CtaSection />
    </>
  );
};

export default LocalMarket; 