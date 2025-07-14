import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypography } from '../../hooks/useTypography';

// Footer Link Component
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const { getTypographyClasses } = useTypography();
  return (
    <a 
      href={href} 
      className={`text-gray-300 hover:text-white transition-colors duration-200 ${getTypographyClasses('body')}`}
    >
      {children}
    </a>
  );
};

// Social Icon Component
const SocialIcon: React.FC<{ href: string; icon: string; alt: string }> = ({ href, icon, alt }) => (
  <a 
    href={href} 
    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
  >
    <img src={icon} alt={alt} className="w-5 h-5" />
  </a>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();

  return (
    <footer 
      className="bg-no-repeat bg-cover bg-center text-white"
      style={{ backgroundImage: 'url(/images/footer-background.png)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Services */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className={`text-lg text-white mb-6 ${getTypographyClasses('title')}`}>{t('footer.services')}</h3>
            <FooterLink href="#">{t('footer.localBrokerage')}</FooterLink>
            <FooterLink href="#">{t('footer.globalBrokerage')}</FooterLink>
            <FooterLink href="#">{t('footer.marginLending')}</FooterLink>
            <FooterLink href="#">{t('footer.portfolioManagment')}</FooterLink>
            <FooterLink href="#">{t('footer.mutualFunds')}</FooterLink>
            <FooterLink href="#">{t('footer.investmentBanking')}</FooterLink>
            <FooterLink href="#">{t('footer.realEstate')}</FooterLink>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className={`text-lg text-white mb-6 ${getTypographyClasses('title')}`}>{t('footer.company')}</h3>
            <FooterLink href="#">{t('footer.aboutUs')}</FooterLink>
            <FooterLink href="#">{t('footer.media')}</FooterLink>
            <FooterLink href="#">{t('footer.careers')}</FooterLink>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className={`text-lg text-white mb-6 ${getTypographyClasses('title')}`}>{t('footer.quickLinks')}</h3>
            <FooterLink href="#">{t('footer.support')}</FooterLink>
            <FooterLink href="#">{t('footer.faq')}</FooterLink>
            <FooterLink href="#">{t('footer.privacyPolicy')}</FooterLink>
            <FooterLink href="#">{t('footer.termsOfService')}</FooterLink>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className={`text-lg text-white mb-6 ${getTypographyClasses('title')}`}>{t('footer.contactUs')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/icons/icon-phone.svg" alt="Phone" className="w-5 h-5" />
                <span className={`text-gray-300 ${getTypographyClasses('body')}`}>+966 11 4199 999</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="/icons/icon-email.svg" alt="Email" className="w-5 h-5" />
                <span className={`text-gray-300 ${getTypographyClasses('body')}`}>info@icap.com.sa</span>
              </div>
              <div className="flex items-start gap-3">
                <img src="/icons/icon-location.svg" alt="Location" className="w-5 h-5 mt-1" />
                <span className={`text-gray-300 ${getTypographyClasses('body')}`}>
                  King Fahd Road, Olaya District<br />
                  Riyadh 12213, Saudi Arabia
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-3">
            <h3 className={`text-lg text-white mb-6 ${getTypographyClasses('title')}`}>{t('footer.followUs')}</h3>
            <div className="flex gap-4">
              <SocialIcon href="#" icon="/icons/icon-facebook.svg" alt="Facebook" />
              <SocialIcon href="#" icon="/icons/icon-twitter.svg" alt="Twitter" />
              <SocialIcon href="#" icon="/icons/icon-linkedin.svg" alt="LinkedIn" />
              <SocialIcon href="#" icon="/icons/icon-instagram.svg" alt="Instagram" />
              <SocialIcon href="#" icon="/icons/icon-youtube.svg" alt="YouTube" />
              <SocialIcon href="#" icon="/icons/icon-whatsapp.svg" alt="WhatsApp" />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-gray-400 text-sm ${getTypographyClasses('body')}`}>
              © {new Date().getFullYear()} ICAP. {t('footer.allRightsReserved')}
            </p>
            <div className="flex gap-6">
              <FooterLink href="#">{t('footer.privacyPolicy')}</FooterLink>
              <FooterLink href="#">{t('footer.termsOfService')}</FooterLink>
              <FooterLink href="#">{t('footer.cookies')}</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 