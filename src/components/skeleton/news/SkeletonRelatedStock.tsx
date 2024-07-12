import React from 'react';
import Skeleton from '../shared/Skeleton';
import SkeletonText from '../shared/SkeletonText';
import SkeletonIcon from '../shared/SkeletonIcon';
import SkeletonStockListItem from '../stock/SkeletonStockListItem';

export default function SkeletonRelatedStock() {
  return (
    <div className="flex flex-col">
      <SkeletonStockListItem type="related" />
    </div>
  );
}
