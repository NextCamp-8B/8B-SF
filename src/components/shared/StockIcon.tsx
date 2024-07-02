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
      className={`rounded-full flex items-center justify-center overflow-hidden ${
        size === 'medium' && 'w-12 h-12'
      } ${size === 'small' && 'w-12 h-12'}`}
    >
      <img className=" text-grayscale-0" src={path} />
    </div>
  );
}
