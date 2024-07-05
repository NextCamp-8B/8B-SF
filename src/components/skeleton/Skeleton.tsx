import React from 'react';

type SkeletonProps = {
  className: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`bg-grayscale-500 overflow-hidden relative before:content-[""] before:w-1/2  before:h-full  before:absolute before:inset-0  before:bg-gradient-to-r before:from-grayscale-500 before:to-grayscale-500 before:via-[rgba(255,255,255,0.4)] before:blur-md before:animate-move-skeleton ${className}`}
    ></div>
  );
}
