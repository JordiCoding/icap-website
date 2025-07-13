import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import Button from '../ui/Button';
import { NewsSlider } from '../news/NewsSlider';
import { useNewsData } from '../../hooks/useNewsData';
import type { NewsCardProps } from '../../types/news';

const NewsroomSection: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { articles, loading, error } = useNewsData();

  // Transform articles for NewsSlider
  const newsArticles: NewsCardProps[] = articles.map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    image: article.featuredImage?.url || '',
    date: article.publishedDate,
    featured: article.featured
  }));

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-white py-[150px] md:py-[200px] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="h-[300px] bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-white py-[150px] md:py-[200px] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-icap-primary mb-6">
              {t('newsroom.title')}
            </h2>
            <p className="text-red-600 mb-8">
              Failed to load news articles. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

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