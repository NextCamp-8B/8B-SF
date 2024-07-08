import React from 'react';
import Skeleton from '../shared/Skeleton';
import SkeletonCard from '../shared/SkeletonCard';

export default function SkeletonTodayPopularNews() {
  return (
    <div className="flex gap-5">
      <SkeletonCard type="News3" />
      <div className="flex flex-col gap-5">
        <SkeletonCard type="News4" />
        <SkeletonCard type="News4" />
      </div>
    </div>
  );
}
