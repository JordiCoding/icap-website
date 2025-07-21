import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypography } from '../../hooks/useTypography';
import type { NewsCardProps } from '../../types/news';

export const NewsCard: React.FC<NewsCardProps> = ({
  id,
  slug,
  title,
  description,
  image,
  date,
  featured = false,
  className = '',
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { getTypographyClasses } = useTypography();

  const handleClick = () => {
    navigate(`/news/${slug}`);
  };

  const formattedDate = new Date(date).toLocaleDateString(
    i18n.language === 'ar' ? 'ar-SA' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={`bg-[#FBF7F1] rounded-lg overflow-hidden h-full cursor-pointer ${
        featured ? 'ring-2 ring-icap-primary' : ''
      } ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 text-left">
        <p className={`text-sm text-gray-500 mb-2 ${getTypographyClasses('body')}`}>{formattedDate}</p>
        <h3 className={`text-xl text-icap-primary mb-3 line-clamp-2 ${getTypographyClasses('title')}`}>
          {title}
        </h3>
        <p className={`text-gray-600 line-clamp-3 leading-relaxed ${getTypographyClasses('body')}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}; 