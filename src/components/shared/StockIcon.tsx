import React from 'react';

interface StockIconProps {
  children: React.ReactNode;
  size?: 'medium' | 'small';
}

export default function StockIcon({
  children,
  size = 'medium',
}: StockIconProps) {
  return (
    <div
      className={` bg-grayscale-900 rounded-full flex items-center justify-center ${
        size === 'medium' && 'w-16 h-16'
      } ${size === 'small' && 'w-12 h-12'}`}
    >
      {children}
    </div>
  );
}
