import React from 'react';
import clsx from 'clsx';
import { useTypography } from '../../hooks/useTypography';

type ButtonVariant = 'primary' | 'secondary' | 'black';

interface ButtonProps<C extends React.ElementType = 'button'> {
  as?: C;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const Button = <C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps<C>>) => {
  const Component = as || 'button';
  const { getTypographyClasses } = useTypography();

  const baseStyles = `inline-block px-8 py-4 rounded-[32px] transition-colors text-center ${getTypographyClasses('body')}`;

  const variantStyles = {
    primary: 'bg-icap-gold text-icap-primary hover:bg-icap-gold/90',
    secondary: 'bg-transparent border border-white text-white hover:bg-white hover:text-icap-primary',
    black: 'bg-black text-white hover:bg-gray-800',
  };

  return (
    <Component
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button; 