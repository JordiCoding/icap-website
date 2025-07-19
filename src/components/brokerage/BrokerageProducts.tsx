import React from 'react';
import { motion } from 'framer-motion';

const BrokerageProducts: React.FC = () => {
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
            <span className="text-[#A44F17]">Trading</span> Opportunities Across Markets
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: '22px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Whether you're looking to invest in Saudi equities or diversify globally, we provide the tools and access you need to trade with confidence.
          </motion.p>
        </div>

        {/* Cards Container */}
        <div className="flex justify-center items-start gap-6 group">
          {/* Local Market Card */}
          <div className="w-[360px] h-[550px] rounded-[32px] flex flex-col p-8 hover:scale-[1.05] group-hover:scale-[0.98] transition-transform duration-300 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/localmarketasset.png)',
              backgroundSize: 'cover',
              
            }}
          >
            <h3 className="text-white mb-6" style={{ fontFamily: 'Chap, sans-serif', fontSize: '40px', fontWeight: 'bold', lineHeight: '1.2' }}>
              Local Market
            </h3>
            <p className="text-white leading-relaxed flex-1 mb-8" style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: '18px', lineHeight: '1.6' }}>
              Access Tadawul-listed equities, sukuk, and IPOs with powerful tools and real-time insights tailored to local investors.
            </p>
            <button className="w-12 h-12 bg-[#F2D794] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1D1306]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>

          {/* International Market Card */}
          <div className="w-[360px] h-[550px] rounded-[32px] flex flex-col p-8 hover:scale-[1.05] group-hover:scale-[0.98] transition-transform duration-300 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/intermarketasset.png)',
              backgroundSize: 'cover',
            
            }}
          >
            <h3 className="text-white mb-6" style={{ fontFamily: 'Chap, sans-serif', fontSize: '40px', fontWeight: 'bold', lineHeight: '1.2' }}>
              International Market
            </h3>
            <p className="text-white leading-relaxed flex-1 mb-8" style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: '18px', lineHeight: '1.6' }}>
              Tap into global exchanges with a single platform. Explore stocks, ETFs, and more across major international markets with ease.
            </p>
            <button className="w-12 h-12 bg-[#F2D794] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1D1306]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>

          {/* Margin Lending Card */}
          <div className="w-[360px] h-[550px] rounded-[32px] flex flex-col p-8 hover:scale-[1.05] group-hover:scale-[0.98] transition-transform duration-300 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/marginasset.png)',
              backgroundSize: 'cover',
              
              
            }}
          >
            <h3 className="text-white mb-6" style={{ fontFamily: 'Chap, sans-serif', fontSize: '40px', fontWeight: 'bold', lineHeight: '1.2' }}>
              Margin Lending
            </h3>
            <p className="text-white leading-relaxed flex-1 mb-8" style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: '18px', lineHeight: '1.6' }}>
              A diversified mix of Sharia-compliant Sukuk, fixed income, trade finance, money market instruments, and similar funds.
            </p>
            <button className="w-12 h-12 bg-[#F2D794] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1D1306]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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