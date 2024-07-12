import { StockListItemProps } from '@/components/shared/StockListItem';
import React from 'react';
import SkeletonIcon from '../shared/SkeletonIcon';
import SkeletonText from '../shared/SkeletonText';
import StockIcon from '@/components/shared/StockIcon';

type SkeletonStockListItemProps = Pick<StockListItemProps, 'type'>;

export default function SkeletonStockListItem({
  type = 'default',
}: SkeletonStockListItemProps) {
  return (
    <>
      {type === 'default' && (
        <div className="flex gap-5 justify-between px-4 py-2">
          <SkeletonIcon type="medium" />
          <div className="flex flex-col justify-center gap-1 flex-1">
            <SkeletonText type="b3" className="w-14" />
            <SkeletonText type="b5" className="w-10" />
          </div>
          <div className="flex flex-col justify-center items-end gap-1">
            <SkeletonText type="b3" className="w-14" />
            <SkeletonText type="b4" className="w-24" />
          </div>
        </div>
      )}
      {type === 'find' && (
        <div className="flex gap-4 justify-between py-2">
          <SkeletonIcon type="small" />
          <div className="flex flex-col justify-center gap-1 flex-1">
            <SkeletonText type="b4" className="w-14" />
            <SkeletonText type="b5" className="w-10" />
          </div>
          <div className="flex flex-col justify-center items-end gap-1">
            <SkeletonText type="b5" className="w-14" />
            <SkeletonText type="b5" className="w-24" />
          </div>
        </div>
      )}
      {type === 'related' && (
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
      )}
      {type === 'report' && (
        <div className="flex  items-center gap-2">
          <SkeletonIcon type="small" />
          <SkeletonText type="b3" className="w-60" />
        </div>
      )}
      {type === 'description' && (
        <div className="flex  flex-col gap-2">
          <SkeletonText type="b2" className="w-36" />
          <SkeletonText type="b3" className="w-32" />
        </div>
      )}
    </>
  );
}
