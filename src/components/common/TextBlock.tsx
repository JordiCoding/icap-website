import React from 'react';
import clsx from 'clsx';
import { useTypography } from '../../hooks/useTypography';

interface TextBlockProps {
  title: React.ReactNode;
  subtitle: string;
  actions?: React.ReactNode;
  variant?: 'dark' | 'light'; // dark is for dark text on light bg
  className?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
  title,
  subtitle,
  actions,
  variant = 'dark',
  className = '',
}) => {
  const { getTypographyClasses } = useTypography();
  const titleColor = variant === 'light' ? 'text-white' : 'text-icap-primary';
  const subtitleColor = variant === 'light' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <h2 className={clsx('text-4xl lg:text-5xl font-bold', titleColor, getTypographyClasses('title'))}>
        {title}
      </h2>
      <p className={clsx('text-lg max-w-xl', subtitleColor, getTypographyClasses('body'))}>
        {subtitle}
      </p>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
};

export default TextBlock; 