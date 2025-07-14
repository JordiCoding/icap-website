import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useTypography } from '../../hooks/useTypography';

const WhyAlistithmarSection: React.FC = () => {
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
      className="relative bg-[#221200] py-[150px] md:py-[200px] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className={`text-4xl lg:text-5xl text-white mb-6 ${getTypographyClasses('title')}`}>
              {t('whyAlistithmar.title')}
            </h2>
            <p className={`text-lg text-gray-300 max-w-4xl mx-auto ${getTypographyClasses('body')}`}>
              {t('whyAlistithmar.subtitle')}
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Card 1: Secure & Trusted */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="mb-6">
                <img
                  src="/images/why1.png"
                  alt={t('whyAlistithmar.secureTitle')}
                  className="w-20 h-20 mx-auto object-contain"
                />
              </div>
              <h3 className={`text-xl text-white mb-4 ${getTypographyClasses('title')}`}>
                {t('whyAlistithmar.secureTitle')}
              </h3>
              <p className={`text-gray-300 leading-relaxed ${getTypographyClasses('body')}`}>
                {t('whyAlistithmar.secureDescription')}
              </p>
            </motion.div>

            {/* Card 2: Shariah-Compliant Options */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="mb-6">
                <img
                  src="/images/why2.png"
                  alt={t('whyAlistithmar.shariaTitle')}
                  className="w-20 h-20 mx-auto object-contain"
                />
              </div>
              <h3 className={`text-xl text-white mb-4 ${getTypographyClasses('title')}`}>
                {t('whyAlistithmar.shariaTitle')}
              </h3>
              <p className={`text-gray-300 leading-relaxed ${getTypographyClasses('body')}`}>
                {t('whyAlistithmar.shariaDescription')}
              </p>
            </motion.div>

            {/* Card 3: Global Reach, Local Roots */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="mb-6">
                <img
                  src="/images/why3.png"
                  alt={t('whyAlistithmar.globalTitle')}
                  className="w-20 h-20 mx-auto object-contain"
                />
              </div>
              <h3 className={`text-xl text-white mb-4 ${getTypographyClasses('title')}`}>
                {t('whyAlistithmar.globalTitle')}
              </h3>
              <p className={`text-gray-300 leading-relaxed ${getTypographyClasses('body')}`}>
                {t('whyAlistithmar.globalDescription')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAlistithmarSection; 