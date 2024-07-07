import React from 'react';
import Skeleton from '../shared/Skeleton';

export default function SkeletonTodayPopularNews() {
  return (
    <div className="flex gap-5">
      <Skeleton className="w-[590px] h-[420px] rounded-2xl" />
      <div className="flex flex-col gap-5">
        <Skeleton className="w-[590px] h-[200px] rounded-2xl" />
        <Skeleton className="w-[590px] h-[200px] rounded-2xl" />
      </div>
    </div>
  );
}
