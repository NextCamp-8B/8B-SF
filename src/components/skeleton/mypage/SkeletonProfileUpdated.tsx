import React from 'react';
import SkeletonText from '../shared/SkeletonText';

export default function SkeletonProfileUpdated() {
  return (
    <div className="flex flex-col justify-center items-center w-full pr-6">
      <div className="flex flex-col items-center mb-10">
        <SkeletonText type="h3" className="w-32 h-32" />
      </div>
      <div className="flex flex-col gap-6 w-[386px]">
        <div className="flex flex-col gap-1">
          <SkeletonText type="b2" className="w-20" />
          <SkeletonText type="h3" className="w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <SkeletonText type="b2" className="w-20" />
          <SkeletonText type="h3" className="w-full" />
        </div>
      </div>
      <SkeletonText type="h2" className="w-96 h-14 mt-8" />
    </div>
  );
}
