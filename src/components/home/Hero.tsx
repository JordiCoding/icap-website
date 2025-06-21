import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          {t('home.title')}
        </h1>
        <p className="text-lg md:text-xl mb-8">
          {t('home.subtitle')}
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="primary">{t('home.login')}</Button>
          <Button variant="secondary">{t('home.signup')}</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 