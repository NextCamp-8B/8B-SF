import React from 'react';
import Skeleton from './Skeleton';

type SkeletonTextProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'b1' | 'b2' | 'b3' | 'b4' | 'b5';
  className?: string;
};

export default function SkeletonText({
  type,
  className,
}: SkeletonTextProps) {
  return (
    <>
      {type === 'h1' && (
        <Skeleton className={`h-[72px] rounded-lg ${className}`} />
      )}
      {type === 'h2' && (
        <Skeleton className={`h-14 rounded-lg ${className}`} />
      )}
      {type === 'h3' && (
        <Skeleton className={`h-10 rounded-lg ${className}`} />
      )}
      {type === 'h4' && (
        <Skeleton className={`h-9 rounded-lg ${className}`} />
      )}

      {type === 'b1' && (
        <Skeleton className={`h-8 rounded-lg ${className}`} />
      )}
      {type === 'b2' && (
        <Skeleton className={`h-7 rounded-md ${className}`} />
      )}
      {type === 'b3' && (
        <Skeleton className={`h-6 rounded-md ${className}`} />
      )}
      {type === 'b4' && (
        <Skeleton className={`h-5 rounded-md ${className}`} />
      )}
      {type === 'b5' && (
        <Skeleton className={`h-4 rounded-md ${className}`} />
      )}
    </>
  );
}
