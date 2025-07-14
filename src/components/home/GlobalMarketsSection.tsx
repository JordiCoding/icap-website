import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useTypography } from '../../hooks/useTypography';
import Button from '../ui/Button';

const GlobalMarketsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isArabic = i18n.language === 'ar';

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Simplified layout classes
  const contentClasses = isArabic 
    ? 'text-center md:text-right md:ml-auto md:mr-16' 
    : 'text-center md:text-left md:mr-auto md:ml-16';

  return (
    <div
      ref={ref}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: '#221200' }}
    >
      {/* Mobile Background Image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center md:hidden"
        style={{ 
          backgroundImage: 'url(/images/mglobal.png)',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Tablet & Desktop Background Image */}
      <div 
        className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-bottom"
        style={{ 
          backgroundImage: 'url(/images/global.png)',
          backgroundSize: '100% auto',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
      
      <div className="relative z-10 w-full h-full">
        <div className="h-full pt-16 pb-8 md:pt-16 lg:pt-20">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`px-4 max-w-xl ${contentClasses}`}
          >
            {/* Desktop Title */}
            <h2 className={`hidden md:block text-4xl lg:text-5xl xl:text-6xl text-white whitespace-nowrap ${getTypographyClasses('title')}`}>
              {t('globalMarkets.titlePart1')} <span className="text-[#F3B660]">{t('globalMarkets.titlePart2')}</span>
            </h2>

            {/* Mobile Title */}
            <div className="block md:hidden text-center">
              <h2 className={`text-4xl mb-4 ${getTypographyClasses('title')}`}>
                <span className="text-[#F3B660] block mb-2">{t('globalMarkets.titlePart1')}</span>
                <span className="text-white block">{t('globalMarkets.titlePart2')}</span>
              </h2>
            </div>

            {/* Mobile Subtitle */}
            <div className={`block md:hidden text-white text-center mb-8 ${getTypographyClasses('body')}`} style={{ fontSize: '22px', lineHeight: '32px' }}>
              <p>{t('globalMarkets.subtitle').split('— ')[0]}</p>
              <p>— {t('globalMarkets.subtitle').split('— ')[1]}</p>
            </div>

            {/* Desktop Subtitle */}
            <div className={`hidden md:block text-white mt-6 max-w-[500px] ${getTypographyClasses('body')}`} style={{ fontSize: '22px', lineHeight: '32px' }}>
              <p>{t('globalMarkets.subtitle').split('— ')[0]}</p>
              <p>— {t('globalMarkets.subtitle').split('— ')[1]}</p>
            </div>

            {/* CTA Button */}
            <Button 
              variant="primary" 
              as="a" 
              href="#" 
              className={`bg-white text-black hover:bg-gray-100 text-base mb-8 md:mt-8 ${getTypographyClasses('body')}`}
            >
              {t('globalMarkets.learnMore')}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMarketsSection; 