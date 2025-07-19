import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useTypography } from '../../hooks/useTypography';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavLink: React.FC<{ to: string; onClick: () => void; children: React.ReactNode }> = ({ to, onClick, children }) => {
  const { getTypographyClasses } = useTypography();
  return (
    <Link to={to} className={`text-2xl text-white ${getTypographyClasses('body')}`} onClick={onClick}>
      {children}
    </Link>
  );
};

interface DropdownItem {
  to: string;
  label: string;
}

const MobileNavDropdown: React.FC<{ title: string; items: DropdownItem[]; onClose: () => void }> = ({ title, items, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTypographyClasses } = useTypography();

  return (
    <div className="text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-2xl text-white flex items-center justify-center gap-2 w-full ${getTypographyClasses('body')}`}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <MobileNavLink key={item.to} to={item.to} onClick={onClose}>
              {item.label}
            </MobileNavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { getTypographyClasses } = useTypography();

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1D1306] z-50 md:hidden">
      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors"
        aria-label="Close menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
        <MobileNavLink to="#" onClick={onClose}>{t('navigation.brokerage')}</MobileNavLink>
        <MobileNavLink to="#" onClick={onClose}>{t('navigation.assetManagment')}</MobileNavLink>
        <MobileNavLink to="/investment-banking" onClick={onClose}>{t('navigation.investmentBanking')}</MobileNavLink>
        <MobileNavLink to="/real-estate" onClick={onClose}>{t('navigation.realEstate')}</MobileNavLink>
        <MobileNavLink to="/about" onClick={onClose}>{t('navigation.about')}</MobileNavLink>
        <button onClick={toggleLanguage} className={`text-2xl text-white ${getTypographyClasses('body')}`}>
          {currentLanguage === 'en' ? 'AR' : 'EN'}
        </button>
      </div>
    </div>
  );
};

export default MobileNav; 