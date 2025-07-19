import React from 'react';
import clsx from 'clsx';
import { useTypography } from '../../hooks/useTypography';

type ButtonVariant = 'primary' | 'secondary' | 'black' | 'white';

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

  const baseStyles = `inline-block px-8 py-4 transition-colors text-center ${getTypographyClasses('body')}`;

  const variantStyles = {
    primary: 'rounded-[52px] bg-gradient-to-r from-[#F2D794] to-[#D0A457] text-icap-primary hover:opacity-90',
    secondary: 'rounded-[32px] bg-transparent border border-white text-white hover:bg-white hover:text-icap-primary',
    black: 'rounded-[32px] bg-black text-white hover:bg-gray-800',
    white: 'rounded-[32px] bg-white text-icap-primary hover:bg-gray-100',
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