import React from 'react';
import Skeleton from '@/components/skeleton/shared/Skeleton';

export default function SkeletonHomeRelatedNews() {
  return (
    <div className="flex gap-5">
      <div className="w-[355px] h-[100px] rounded-2xl bg-grayscale-300 flex items-center px-4 ">
        <div className="flex gap-2 flex-1 flex-col pr-8 ">
          <Skeleton className="w-20 h-[14px] rounded-md" />
          <Skeleton className="w-11/12 h-5 rounded-md" />
        </div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <div className="w-[355px] h-[100px] rounded-2xl bg-grayscale-300 flex items-center px-4 ">
        <div className="flex gap-2 flex-1 flex-col pr-8 ">
          <Skeleton className="w-20 h-[14px] rounded-md" />
          <Skeleton className="w-11/12 h-5 rounded-md" />
        </div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <div className="w-[355px] h-[100px] rounded-2xl bg-grayscale-300 flex items-center px-4 ">
        <div className="flex gap-2 flex-1 flex-col pr-8 ">
          <Skeleton className="w-20 h-[14px] rounded-md" />
          <Skeleton className="w-11/12 h-5 rounded-md" />
        </div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
}
