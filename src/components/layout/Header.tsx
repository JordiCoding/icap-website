import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import MobileNav from './MobileNav';
import { Link } from 'react-router-dom';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link to={href} className="text-white hover:text-primary-300 transition-colors duration-200">
    {children}
  </Link>
);

const NavLinkDropdown = ({ title, children, isOpen, onClick }: { title: string; children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="relative group">
    <button onClick={onClick} className="text-white hover:text-primary-300 transition-colors duration-200 flex items-center gap-2">
      <span>{title}</span>
      <img src="/icons/chevron-down.svg" alt="dropdown" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && children}
  </div>
);

interface HeaderProps {
  background?: string;
  position?: 'absolute' | 'relative';
}

const Header: React.FC<HeaderProps> = ({ background, position = 'absolute' }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdown = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  return (
    <>
      <header 
        className={`${position} top-0 left-0 w-full z-10 py-4`}
        style={{ backgroundColor: background }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-8 w-auto" src="/logo/icap-logo.svg" alt="ICAP Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLinkDropdown
                title={t('navigation.brokerage')}
                isOpen={openDropdown === 'brokerage'}
                onClick={() => handleDropdown('brokerage')}
              >
                <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('footer.localBrokerage')}</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('footer.globalBrokerage')}</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('footer.marginLending')}</a>
                </div>
              </NavLinkDropdown>
              <NavLinkDropdown
                title={t('navigation.assetManagment')}
                isOpen={openDropdown === 'assetManagment'}
                onClick={() => handleDropdown('assetManagment')}
              >
                <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('footer.portfolioManagment')}</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('footer.mutualFunds')}</a>
                </div>
              </NavLinkDropdown>
              <NavLink href="/investment-banking">{t('navigation.investmentBanking')}</NavLink>
              <NavLink href="/real-estate">{t('navigation.realEstate')}</NavLink>
              <NavLink href="/about">{t('navigation.about')}</NavLink>
              <NavLink href="/newsroom">{t('navigation.newsroom')}</NavLink>
            </nav>

            {/* Right side controls */}
            <div className="hidden md:flex items-center gap-4">
              <button>
                <img src="/icons/search.svg" alt="Search" className="w-6 h-6" />
              </button>
              <button
                onClick={toggleLanguage}
                className="text-white hover:text-primary-300 transition-colors duration-200 font-medium"
              >
                {currentLanguage === 'en' ? 'AR' : 'EN'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white">
                {/* Hamburger Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default Header; 