import React from 'react';
import SkeletonCard from '../shared/SkeletonCard';

export default function SkeletonRelatedNewsToStock() {
  return (
    <div className="flex gap-5">
      <SkeletonCard type="News2" />
      <SkeletonCard type="News2" />
      <SkeletonCard type="News2" />
    </div>
  );
}
