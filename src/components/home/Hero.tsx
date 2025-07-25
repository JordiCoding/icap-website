import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

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

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          variants={itemVariants}
        >
          {t('home.title')}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          variants={itemVariants}
        >
          {t('home.subtitle')}
        </motion.p>
        <motion.div
          className="flex justify-center gap-4"
          variants={itemVariants}
        >
          <Button variant="primary">{t('home.login')}</Button>
          <Button variant="secondary">{t('home.signup')}</Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero; 