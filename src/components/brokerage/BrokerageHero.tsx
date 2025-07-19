import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const BrokerageHero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: 'url(/images/brokeragebackground.png)' }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Chap, sans-serif', fontSize: '52px' }}
            variants={itemVariants}
          >
            Brokerage Services
            <br />
            <span className="text-white whitespace-nowrap">Designed for Every Investor</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-xl"
            style={{ fontFamily: 'Jokker Light, sans-serif', fontSize: '22px' }}
            variants={itemVariants}
          >
            Access Saudi and global markets with ease. Whether you're a beginner or a seasoned trader, our platform offers the tools, insights, and support you need to invest confidently.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button variant="primary" className="text-lg px-8 py-4">
              Open an Account
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrokerageHero; 