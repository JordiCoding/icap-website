import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useTypography } from '../../../../shared/hooks';
import { Button } from '../../../../shared/components/ui';

const TradeYourWaySection: React.FC = () => {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const tradingChannels = [
    {
      title: 'Mobile Application',
      description: 'Trade on the go with our mobile application.',
      buttonText: 'Download App',
      buttonLink: '/mobile-app',
    },
    {
      title: 'Website Channel',
      description: 'Access your account and trade via our website.',
      buttonText: 'Register Now',
      buttonLink: '/register',
    },
    {
      title: 'Phone Channel',
      description: 'Place trades by phone with expert assistance.',
      buttonText: 'Call Now',
      buttonLink: '/phone-trading',
    },
    {
      title: 'Trading Terminal',
      description: 'Installable platform for advanced trading on desktop.',
      buttonText: 'Download App',
      buttonLink: '/trading-terminal',
    },
  ];

  return (
    <section 
      ref={ref}
      className="relative py-[150px] md:py-[200px] overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/images/darkbackground2.png)' }}
        aria-hidden="true"
      />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className={`text-4xl lg:text-5xl mb-6 ${getTypographyClasses('title')}`}>
              <span className="text-[#F2D794]">{t('brokerage.tradeYourWay.title').split(' ')[0]}</span>{' '}
              <span className="text-white">{t('brokerage.tradeYourWay.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className={`text-lg text-gray-300 max-w-4xl mx-auto ${getTypographyClasses('body')}`}>
              {t('brokerage.tradeYourWay.description')}
            </p>
          </motion.div>

          {/* Trading Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {tradingChannels.map((channel, index) => (
              <motion.div 
                key={index}
                variants={itemVariants} 
                className="relative group"
              >
                <div className="rounded-xl p-6 h-full border border-[#F2D794]/20 hover:border-[#F2D794]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#F2D794]/10 relative overflow-hidden">
                  {/* Card Background Image */}
                  <div 
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: 'url(/images/Trade Your Way1.png)' }}
                    aria-hidden="true"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40 rounded-xl" />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#F2D794]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Card Content */}
                    <div className="text-center">
                      <h3 className={`text-xl text-white mb-4 ${getTypographyClasses('title')}`}>
                        {channel.title}
                      </h3>
                      <p className={`text-gray-300 leading-relaxed mb-6 ${getTypographyClasses('body')}`}>
                        {channel.description}
                      </p>
                      
                      {/* Button */}
                      <Button 
                        variant="primary" 
                        className="w-full"
                        as="a"
                        href={channel.buttonLink}
                      >
                        {channel.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TradeYourWaySection; 