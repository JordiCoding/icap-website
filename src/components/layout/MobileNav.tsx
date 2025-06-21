import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link to={to} className="text-2xl text-white font-bold" onClick={onClick}>
    {children}
  </Link>
);

interface DropdownItem {
  label: string;
  to: string;
}

const MobileNavDropdown = ({ title, items, onClose }: { title: string; items: DropdownItem[]; onClose: () => void; }) => {
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

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
    onClose();
  };

  const brokerageItems: DropdownItem[] = [
    { to: '#', label: t('footer.localBrokerage') },
    { to: '#', label: t('footer.globalBrokerage') },
    { to: '#', label: t('footer.marginLending') },
  ];

  const assetManagementItems: DropdownItem[] = [
    { to: '#', label: t('footer.portfolioManagment') },
    { to: '#', label: t('footer.mutualFunds') },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1D1306] z-50 md:hidden p-8">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <MobileNavDropdown title={t('navigation.brokerage')} items={brokerageItems} onClose={onClose} />
        <MobileNavDropdown title={t('navigation.assetManagment')} items={assetManagementItems} onClose={onClose} />
        <MobileNavLink to="/investment-banking" onClick={onClose}>{t('navigation.investmentBanking')}</MobileNavLink>
        <MobileNavLink to="/real-estate" onClick={onClose}>{t('navigation.realEstate')}</MobileNavLink>
        <MobileNavLink to="/about" onClick={onClose}>{t('navigation.about')}</MobileNavLink>
        <MobileNavLink to="/newsroom" onClick={onClose}>{t('navigation.newsroom')}</MobileNavLink>
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