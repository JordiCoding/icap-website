import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = useCallback((language: 'en' | 'ar') => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Store in localStorage
    localStorage.setItem('language', language);
  }, [i18n]);

  useEffect(() => {
    // Initialize language from localStorage or browser
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
    const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en';
    const initialLanguage = savedLanguage || browserLanguage;
    
    changeLanguage(initialLanguage);
  }, [changeLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    isRTL: currentLanguage === 'ar',
  };
}; 