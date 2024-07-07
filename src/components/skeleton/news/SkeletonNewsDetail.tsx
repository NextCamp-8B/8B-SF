import React from 'react';
import Skeleton from '../shared/Skeleton';
import SkeletonText from '../shared/SkeletonText';
import SkeletonOriginNewsCard from './SkeletonOriginNewsCard';

export default function SkeletonNewsDetail() {
  return (
    <>
      <div>
        <SkeletonText type="h4" className="mb-4" />
        <div className="flex justify-between">
          <div className="flex gap-[6px]">
            <SkeletonText type="b4" className="w-28" />
            <SkeletonText type="b5" className="w-14" />
            <SkeletonText type="b5" className="w-14" />
          </div>
          <Skeleton className="rounded-lg w-[176px] h-[36px]" />
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center pb-6">
          <Skeleton className="w-6 h-6 rounded" />
          <SkeletonText type="b4" className="w-24" />
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonText type="b4" />
          <SkeletonText type="b4" className="w-9/12" />
          <SkeletonText type="b4" className="w-10/12" />
          <SkeletonText type="b4" className="w-4/12" />
        </div>
      </div>
      <Skeleton className="rounded-lg w-full h-80" />
      <div>
        <SkeletonText type="h4" className="w-32 mb-4" />
        <div className="flex flex-col gap-4 pb-14">
          <div className="flex flex-col gap-2">
            <SkeletonText type="b4" />
            <SkeletonText type="b4" className="w-9/12" />
            <SkeletonText type="b4" className="w-10/12" />
            <SkeletonText type="b4" className="w-6/12" />
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonText type="b4" />
            <SkeletonText type="b4" className="w-9/12" />
            <SkeletonText type="b4" className="w-10/12" />
            <SkeletonText type="b4" className="w-7/12" />
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonText type="b4" />
            <SkeletonText type="b4" className="w-9/12" />
            <SkeletonText type="b4" />
            <SkeletonText type="b4" className="w-10/12" />
          </div>
        </div>
        <SkeletonOriginNewsCard />
      </div>
    </>
  );
}
