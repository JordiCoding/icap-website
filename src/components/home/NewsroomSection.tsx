import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import Button from '../ui/Button';
import { NewsSlider } from '../news/NewsSlider';
import type { NewsCardProps } from '../news/NewsCard';

const NewsroomSection: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Sample news data - will be replaced with CMS data later
  const newsArticles: NewsCardProps[] = [
    {
      id: '1',
      title: 'Al Istithmar Capital is among the Forbes Middle ...',
      description: 'Alistithmar Capital is ranked 6th in Forbes Middle East\'s ranking of the largest asset managers in Saudi Arab ...',
      image: '/images/news1.png'
    },
    {
      id: '2',
      title: 'Alistithmar Capital signs real estate development ag ...',
      description: 'Alistithmar Capital is ranked 6th in Forbes Middle East\'s ranking of the largest asset managers in Saudi Arab ...',
      image: '/images/news2.png'
    },
    {
      id: '3',
      title: 'Al Istithmar Capital is among the Forbes Middle ...',
      description: 'Alistithmar Capital is ranked 6th in Forbes Middle East\'s ranking of the largest asset managers in Saudi Arab ...',
      image: '/images/news3.png'
    },
    {
      id: '4',
      title: 'Alistithmar Capital expands investment portfolio ...',
      description: 'Alistithmar Capital continues to strengthen its position in the Saudi market with strategic investments and partnerships ...',
      image: '/images/news1.png'
    },
    {
      id: '5',
      title: 'New Sharia-compliant funds launched by Alistithmar ...',
      description: 'The company introduces innovative Islamic investment solutions tailored for the modern investor seeking ethical returns ...',
      image: '/images/news2.png'
    }
  ];

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

  return (
    <section 
      ref={ref}
      className="relative bg-white py-[150px] md:py-[200px] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-icap-primary mb-6">
              {t('newsroom.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              {t('newsroom.subtitle')}
            </p>
            <Button variant="primary" as="a" href="/newsroom">
              {t('newsroom.viewAllArticles')}
            </Button>
          </motion.div>

          {/* News Slider */}
          <motion.div variants={itemVariants}>
            <NewsSlider articles={newsArticles} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsroomSection; 