import React from 'react';
import Skeleton from '../shared/Skeleton';
import SkeletonText from '../shared/SkeletonText';
import SkeletonIcon from '../shared/SkeletonIcon';

export default function SkeletonRelatedStock() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-2 gap-4">
        <SkeletonIcon type="small" />
        <div className="flex-1">
          <SkeletonText type="b4" className="w-20 mb-1" />
          <SkeletonText type="b5" className="w-14" />
        </div>
        <div className="flex flex-col items-end">
          <SkeletonText type="b5" className="w-16 mb-1" />
          <SkeletonText type="b5" className="w-24" />
        </div>
      </div>
    </div>
  );
}
