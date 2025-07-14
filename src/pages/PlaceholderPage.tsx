import React from 'react';
import { useTypography } from '../hooks/useTypography';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const { getTypographyClasses } = useTypography();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className={`text-4xl ${getTypographyClasses('title')}`}>{title}</h1>
        <p className={`text-lg text-gray-600 mt-4 ${getTypographyClasses('body')}`}>
          This page is under construction. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage; 