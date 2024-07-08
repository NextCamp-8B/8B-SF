import React from 'react';
import Skeleton from '@/components/skeleton/shared/Skeleton';
import SkeletonCard from '../shared/SkeletonCard';

export default function SkeletonHomeRelatedNews() {
  return (
    <div className="flex gap-5">
      <SkeletonCard type="News1" />
      <SkeletonCard type="News1" />
      <SkeletonCard type="News1" />
    </div>
  );
}
