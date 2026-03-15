'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'rounded-xl font-semibold transition-all flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg disabled:opacity-50',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50',
      outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-50 disabled:opacity-50',
      ghost: 'text-gray-700 hover:bg-gray-100 disabled:opacity-50'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';