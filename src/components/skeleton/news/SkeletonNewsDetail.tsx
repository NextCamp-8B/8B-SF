import React from 'react';
import Skeleton from '../Skeleton';

export default function SkeletonNewsDetail() {
  return (
    <>
      <div>
        <Skeleton className="w-full mb-4 h-9 rounded-lg" />
        <div className="flex justify-between">
          <div className="flex gap-[6px]">
            <Skeleton className="w-28 h-5 rounded-md" />
            <Skeleton className="w-14 h-5 rounded-md" />
            <Skeleton className="w-14 h-5 rounded-md" />
          </div>
          <Skeleton className="rounded-lg w-[176px] h-[36px]" />
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center pb-6">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-6 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
        </div>
      </div>
      <Skeleton className="rounded-lg w-full h-80" />
      <div>
        <Skeleton className="w-32 h-9 rounded-lg mb-4" />
        <div className="flex flex-col gap-2 pb-14">
          <Skeleton className="h-6 rounded-md" />
          <Skeleton className="h-6 rounded-md" />
          <Skeleton className="h-6 rounded-md" />
          <Skeleton className="h-6 rounded-md" />
          <Skeleton className="h-6 rounded-md" />
        </div>

        <Skeleton className="h-24 rounded-2xl" />
      </div>
    </>
  );
}
