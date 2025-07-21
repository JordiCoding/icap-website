import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BrokerageProducts: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLocalMarketClick = () => {
    navigate('/local-market');
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/content01-background.png)' }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
            style={{ fontFamily: 'Chap, sans-serif', fontSize: '52px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#A44F17]">{t('brokerage.products.title').split(' ')[0]}</span> {t('brokerage.products.title').split(' ').slice(1).join(' ')}
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: '22px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('brokerage.products.subtitle')}
          </motion.p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Local Market Card */}
          <div 
            className="group w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-[32px] flex flex-col p-6 md:p-8 hover:scale-[1.02] md:hover:scale-[1.05] transition-transform duration-300 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/localmarketasset.png)',
              backgroundSize: 'cover',
            }}
            onClick={handleLocalMarketClick}
          >
            <h3 className="text-white mb-4 md:mb-6" style={{ fontFamily: 'Chap, sans-serif', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 'bold', lineHeight: '1.2' }}>
              {t('brokerage.products.localMarket.title')}
            </h3>
            <p className="text-white leading-relaxed flex-1 mb-6 md:mb-8" style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: '1.6' }}>
              {t('brokerage.products.localMarket.description')}
            </p>
            <button 
              className="w-10 h-10 md:w-12 md:h-12 bg-[#F2D794] rounded-lg flex items-center justify-center self-start hover:bg-[#E6C885] transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleLocalMarketClick();
              }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#1D1306]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>

          {/* International Market Card */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-[32px] flex flex-col p-6 md:p-8 hover:scale-[1.02] md:hover:scale-[1.05] transition-transform duration-300 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/intermarketasset.png)',
              backgroundSize: 'cover',
            }}
          >
            <h3 className="text-white mb-4 md:mb-6" style={{ fontFamily: 'Chap, sans-serif', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 'bold', lineHeight: '1.2' }}>
              {t('brokerage.products.internationalMarket.title')}
            </h3>
            <p className="text-white leading-relaxed flex-1 mb-6 md:mb-8" style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: '1.6' }}>
              {t('brokerage.products.internationalMarket.description')}
            </p>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-[#F2D794] rounded-lg flex items-center justify-center self-start">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#1D1306]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>

          {/* Margin Lending Card */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-[32px] flex flex-col p-6 md:p-8 hover:scale-[1.02] md:hover:scale-[1.05] transition-transform duration-300 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/marginasset.png)',
              backgroundSize: 'cover',
            }}
          >
            <h3 className="text-white mb-4 md:mb-6" style={{ fontFamily: 'Chap, sans-serif', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 'bold', lineHeight: '1.2' }}>
              {t('brokerage.products.marginLending.title')}
            </h3>
            <p className="text-white leading-relaxed flex-1 mb-6 md:mb-8" style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: '1.6' }}>
              {t('brokerage.products.marginLending.description')}
            </p>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-[#F2D794] rounded-lg flex items-center justify-center self-start">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#1D1306]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerageProducts; 