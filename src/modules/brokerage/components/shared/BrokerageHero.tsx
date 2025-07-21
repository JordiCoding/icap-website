import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/components/ui';
import { useLanguage } from '../../../../shared/hooks';

const BrokerageHero: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center">
      {/* Background flipped conditionally */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/brokeragebackground.png)',
          transform: isRTL ? 'scaleX(-1)' : 'none',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`
            max-w-2xl
            ${isRTL ? 'ml-auto text-right' : 'mr-auto text-left'}
          `}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
            style={{ fontFamily: 'Chap, sans-serif' }}
            variants={itemVariants}
          >
            <span className="block">{t('brokerage.hero.title')}</span>
            <span className="text-white block sm:inline">{t('brokerage.hero.subtitle')}</span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 leading-relaxed max-w-xl"
            style={{ fontFamily: 'Jokker Light, sans-serif' }}
            variants={itemVariants}
          >
            {t('brokerage.hero.description')}
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button variant="primary" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              {t('brokerage.hero.button')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrokerageHero; 