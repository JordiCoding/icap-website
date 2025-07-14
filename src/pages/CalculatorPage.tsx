import React from 'react';
import { useTypography } from '../hooks/useTypography';
import Calculator from '../components/calculator/Calculator';

const CalculatorPage: React.FC = () => {
  const { getTypographyClasses } = useTypography();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-3xl mb-4 ${getTypographyClasses('title')}`}>Mutual Fund Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
};

export default CalculatorPage; 