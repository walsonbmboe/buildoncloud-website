import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  asLink?: boolean;
  href?: string;
  ariaLabel?: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantClasses: Record<string, string> = {
  primary:
    'bg-electric-500 text-white hover:bg-electric-600 focus:ring-electric-500',
  secondary:
    'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
  outline:
    'bg-transparent border border-electric-500 text-electric-500 hover:bg-electric-500/10 focus:ring-electric-500',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  asLink = false,
  href,
  ariaLabel,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0';

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  if (asLink) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        role="link"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
