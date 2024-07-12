import React from 'react';
import SkeletonStockListItem from './SkeletonStockListItem';

export default function SkeletonLimitStocks() {
  return (
    <div className="flex flex-col  bg-[#FFFFFF] rounded-2xl mt-6 px-8 py-6">
      <SkeletonStockListItem />
      <SkeletonStockListItem />
      <SkeletonStockListItem />
      <SkeletonStockListItem />
    </div>
  );
}
