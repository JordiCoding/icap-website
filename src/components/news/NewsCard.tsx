import React from 'react';
import { motion } from 'framer-motion';

export interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  image,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`bg-[#FBF7F1] rounded-lg overflow-hidden h-full cursor-pointer ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 text-left">
        <h3 className="text-xl font-bold text-icap-primary mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}; 