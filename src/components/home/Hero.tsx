import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useCmsData } from '../../hooks/useCmsData';
import { useTypography } from '../../hooks/useTypography';

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
  const { getTypographyClasses } = useTypography();
  
  // Fetch CMS data
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCmsData();
  
  // Use CMS data if available, fallback to translation keys
  const title = cmsData?.hero?.title || t('home.title');
  const subtitle = cmsData?.hero?.subtitle || t('home.subtitle');
  const ctaPrimary = cmsData?.hero?.ctaPrimary || t('home.login');
  const ctaSecondary = cmsData?.hero?.ctaSecondary || t('home.signup');
  const backgroundImage = cmsData?.hero?.backgroundImage?.url || '/images/hero-background.jpg';

  // Show loading state if CMS data is being fetched
  if (cmsLoading) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className={getTypographyClasses('body')}>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Show error state if CMS data failed to load (but still show fallback content)
  if (cmsError) {
    console.warn('CMS data failed to load, using fallback content:', cmsError);
  }

  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={`text-5xl md:text-7xl font-bold mb-4 ${getTypographyClasses('body')}`}
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.p
          className={`text-lg md:text-xl mb-8 ${getTypographyClasses('body')}`}
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
        <motion.div
          className="flex justify-center gap-4"
          variants={itemVariants}
        >
          <Button variant="primary">{ctaPrimary}</Button>
          <Button variant="secondary">{ctaSecondary}</Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero; 