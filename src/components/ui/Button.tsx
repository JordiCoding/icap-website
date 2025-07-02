import React from 'react';
import clsx from 'clsx';

type ButtonProps<C extends React.ElementType> = {
  as?: C;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<C>;

const Button = <C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button';

  const baseStyles = 'inline-block px-8 py-4 rounded-[32px] font-bold transition-colors text-center';

  const variantStyles = {
    primary: 'bg-icap-gold text-icap-primary hover:bg-icap-gold/90',
    secondary: 'bg-transparent border border-white text-white hover:bg-white hover:text-icap-primary',
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