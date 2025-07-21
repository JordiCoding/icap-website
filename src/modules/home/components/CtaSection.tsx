import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useTypography } from '../../../shared/hooks';

const CtaSection: React.FC = () => {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section 
      ref={ref}
      className="relative bg-no-repeat bg-cover bg-center py-[112px] md:py-[150px] overflow-hidden"
      style={{ backgroundImage: 'url(/images/content01-background.png)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Pre-title */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className={`text-lg text-gray-600 ${getTypographyClasses('body')}`}>
              {t('cta.preTitle')}
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className={`text-4xl lg:text-6xl font-bold text-icap-primary leading-tight ${getTypographyClasses('title')}`}>
              {t('cta.mainTitle')}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className={`text-3xl lg:text-4xl font-medium text-[#C87D55] leading-tight ${getTypographyClasses('title')}`}>
              {t('cta.subtitle')}
            </h3>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${getTypographyClasses('body')}`}>
              {t('cta.description')}
            </p>
          </motion.div>

          {/* QR Code */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col items-center">
              <img
                src="/images/qrcode.png"
                alt="QR Code"
                className="w-32 h-32 mb-4"
              />
              <p className={`text-gray-600 text-lg ${getTypographyClasses('body')}`}>
                {t('cta.scanMe')}
              </p>
            </div>
          </motion.div>

          {/* App Download Buttons */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="#" className="inline-block">
                <img
                  src="/images/d-badge-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                />
              </a>
              <a href="#" className="inline-block">
                <img
                  src="/images/d-badge-google-play.svg"
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection; 