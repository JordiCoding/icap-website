import React from 'react';
import { useTranslation } from 'react-i18next';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-gray-300 hover:text-white transition-colors duration-200 block">
    {children}
  </a>
);

const ContactItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-3">
    <img src={`/icons/${icon}`} alt="" className="w-5 h-5 flex-shrink-0" />
    <span className="text-gray-300">{text}</span>
  </div>
);

const SocialIcon = ({ href, icon }: { href: string; icon: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img src={`/icons/${icon}`} alt={icon} className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
  </a>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();

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
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.services')}</h3>
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
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.company')}</h3>
            <FooterLink href="#">{t('footer.aboutUs')}</FooterLink>
            <FooterLink href="#">{t('footer.media')}</FooterLink>
            <FooterLink href="#">{t('footer.careers')}</FooterLink>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.quickLinks')}</h3>
            <FooterLink href="#">{t('footer.formsAndApplications')}</FooterLink>
            <FooterLink href="#">{t('footer.investorsAwareness')}</FooterLink>
            <FooterLink href="#">{t('footer.informationSecurity')}</FooterLink>
            <FooterLink href="#">{t('footer.valueAddedTax')}</FooterLink>
            <FooterLink href="#">{t('footer.registerComplaint')}</FooterLink>
            <FooterLink href="#">{t('footer.getInTouch')}</FooterLink>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="sm:col-span-1 space-y-5">
              <h3 className="text-lg font-semibold text-white mb-6">{t('footer.contactUs')}</h3>
              <div className="space-y-4">
                <ContactItem icon="icon-whatsapp.svg" text={t('footer.phone1')} />
                <ContactItem icon="icon-phone.svg" text={t('footer.phone2')} />
                <ContactItem icon="icon-email.svg" text={t('footer.email')} />
                <ContactItem icon="icon-location.svg" text={t('footer.address')} />
              </div>
              <div className="flex gap-4 pt-4">
                <SocialIcon href="#" icon="icon-twitter.svg" />
                <SocialIcon href="#" icon="icon-linkedin.svg" />
                <SocialIcon href="#" icon="icon-facebook.svg" />
                <SocialIcon href="#" icon="icon-youtube.svg" />
                <SocialIcon href="#" icon="icon-instagram.svg" />
              </div>
            </div>
            {/* Map */}
            <div className="sm:col-span-1">
              <img src="/images/footer-map.png" alt="Map" className="rounded-lg w-full h-full object-cover min-h-[150px]" />
            </div>
          </div>
        </div>

        <hr className="my-12 border-gray-700" />

        {/* Middle section with logo and app stores */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 flex items-center gap-4">
            <img src="/logo/icap-logo.svg" alt="ICAP Logo" className="h-12 flex-shrink-0" />
            <p className="text-gray-400 text-sm">{t('footer.logoDescription')}</p>
          </div>
          <div className="flex gap-4">
            <a href="#"><img src="/images/badge-app-store.svg" alt="App Store" className="h-12" /></a>
            <a href="#"><img src="/images/badge-google-play.svg" alt="Google Play" className="h-12" /></a>
          </div>
        </div>

        <hr className="my-12 border-gray-700" />

        {/* Bottom section with legal links and copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 text-gray-400">
            <FooterLink href="#">{t('footer.termsOfService')}</FooterLink>
            <FooterLink href="#">{t('footer.legal')}</FooterLink>
            <FooterLink href="#">{t('footer.privacyPolicy')}</FooterLink>
          </div>
          <p className="text-gray-500">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 