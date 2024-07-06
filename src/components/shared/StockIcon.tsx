import React from 'react';
import SmallLogoDark from '@/assets/logos/small_logo_dark.svg';

interface StockIconProps {
  size?: 'medium' | 'small';
  path?: string;
}

export default function StockIcon({
  size = 'medium',
  path,
}: StockIconProps) {
  return (
    <div
      className={`rounded-full flex items-center justify-center overflow-hidden ${
        size === 'medium' && 'w-16 h-16'
      } ${size === 'small' && 'w-12 h-12'}`}
    >
      {path ? (
        <img className=" text-grayscale-0 w-8" src={path} />
      ) : (
        <SmallLogoDark className="w-8" />
      )}
    </div>
  );
}
