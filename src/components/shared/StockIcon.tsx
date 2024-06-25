import Image from 'next/image';
import React from 'react';

interface StockIconProps {
  size?: 'medium' | 'small';
  path: string;
}

export default function StockIcon({
  size = 'medium',
  path,
}: StockIconProps) {
  return (
    <div
      className={` bg-grayscale-900 rounded-full flex items-center justify-center ${
        size === 'medium' && 'w-16 h-16'
      } ${size === 'small' && 'w-12 h-12'}`}
    >
      <Image width={12} height={12} src={path} alt="icon" />
    </div>
  );
}
