import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardSubComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className = '' }: CardSubComponentProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }: CardSubComponentProps) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '' }: CardSubComponentProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};