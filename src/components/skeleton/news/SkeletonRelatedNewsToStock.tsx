import React from 'react';
import Skeleton from '../Skeleton';

export default function SkeletonRelatedNewsToStock() {
  return (
    <div className="flex gap-5">
      <Skeleton className="w-[388px] h-[360px] rounded-2xl" />
      <Skeleton className="w-[388px] h-[360px] rounded-2xl" />
      <Skeleton className="w-[388px] h-[360px] rounded-2xl" />
    </div>
  );
}
