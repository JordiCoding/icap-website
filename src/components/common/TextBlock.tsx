import React from 'react';
import clsx from 'clsx';

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
  const titleColor = variant === 'light' ? 'text-white' : 'text-icap-primary';
  const subtitleColor = variant === 'light' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <h2 className={clsx('text-4xl lg:text-5xl font-bold', titleColor)}>
        {title}
      </h2>
      <p className={clsx('text-lg max-w-xl', subtitleColor)}>
        {subtitle}
      </p>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
};

export default TextBlock; 