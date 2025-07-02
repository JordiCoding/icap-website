import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import TextBlock from '../common/TextBlock';

const PortfolioSection: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <div
      ref={ref}
      className="bg-no-repeat bg-cover bg-center py-[150px] md:py-[237px] overflow-hidden"
      style={{ backgroundImage: 'url(/images/content01-background.png)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-x-[200px] rtl:lg:flex-row-reverse">
          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <img
              src="/images/portfolio-section-phone.png"
              alt="Portfolio on phone"
              style={{ width: '290px', height: '590px' }}
              className="object-contain"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full lg:w-auto"
          >
            <TextBlock
              title={
                <>
                  <span className="block text-[#A44F17]">
                    {t('portfolio.preTitle')}
                  </span>
                  {t('portfolio.title')}
                </>
              }
              subtitle={t('portfolio.description')}
              actions={
                <div className="flex justify-center lg:justify-end gap-4">
                  <a href="#">
                    <img src="/images/d-badge-app-store.svg" alt="Download on the App Store" className="h-12" />
                  </a>
                  <a href="#">
                    <img src="/images/d-badge-google-play.svg" alt="Get it on Google Play" className="h-12" />
                  </a>
                </div>
              }
              className="text-center items-center lg:text-right lg:items-end rtl:lg:items-start"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection; 