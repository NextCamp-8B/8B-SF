import React from 'react';
import Skeleton from './Skeleton';

type SkeletonIconProps = {
  type: 'small' | 'medium';
};

export default function SkeletonIcon({ type }: SkeletonIconProps) {
  return (
    <>
      {type === 'small' && (
        <Skeleton className="w-12 h-12 rounded-full" />
      )}
      {type === 'medium' && (
        <Skeleton className="w-16 h-16 rounded-full" />
      )}
    </>
  );
}
