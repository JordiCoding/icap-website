import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-2xl text-white font-bold">
    {children}
  </Link>
);

const MobileNavDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="w-full text-center">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-2xl text-white font-bold flex items-center justify-center gap-2 w-full"
      >
        <span>{title}</span>
        <img src="/icons/chevron-down.svg" alt="dropdown" className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      {isDropdownOpen && (
        <div className="flex flex-col items-center gap-4 mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-icap-primary z-50 md:hidden p-8">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <MobileNavDropdown title={t('navigation.brokerage')}>
          <MobileNavLink to="#">{t('footer.localBrokerage')}</MobileNavLink>
          <MobileNavLink to="#">{t('footer.globalBrokerage')}</MobileNavLink>
          <MobileNavLink to="#">{t('footer.marginLending')}</MobileNavLink>
        </MobileNavDropdown>
        <MobileNavDropdown title={t('navigation.assetManagment')}>
          <MobileNavLink to="#">{t('footer.portfolioManagment')}</MobileNavLink>
          <MobileNavLink to="#">{t('footer.mutualFunds')}</MobileNavLink>
        </MobileNavDropdown>
        <MobileNavLink to="/investment-banking">{t('navigation.investmentBanking')}</MobileNavLink>
        <MobileNavLink to="/real-estate">{t('navigation.realEstate')}</MobileNavLink>
        <MobileNavLink to="/about">{t('navigation.about')}</MobileNavLink>
        <MobileNavLink to="/newsroom">{t('navigation.newsroom')}</MobileNavLink>
        <button onClick={toggleLanguage} className="text-2xl text-white font-bold">
          {currentLanguage === 'en' ? 'AR' : 'EN'}
        </button>
      </div>
      <button onClick={onClose} className="absolute top-8 right-8 text-white">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default MobileNav; 