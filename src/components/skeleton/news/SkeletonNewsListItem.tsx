import React from 'react';
import { NewsListItemProps } from '@/components/shared/NewsListItem';
import Skeleton from '../shared/Skeleton';
import SkeletonText from '../shared/SkeletonText';

type SkeletonNewsListItemProps = Pick<NewsListItemProps, 'type'>;

export default function SkeletonNewsListItem({
  type = 'medium',
}: SkeletonNewsListItemProps) {
  return (
    <>
      {type === 'medium' && (
        <div className="flex gap-5 py-8 border-b border-b-grayscale-400 last-of-type:border-none last-of-type:pb-0 first:pt-0 items-center">
          <Skeleton className="w-[172px] h-[100px] rounded-2xl" />
          <div className="flex-1">
            <SkeletonText type="b3" className="w-7/12 mb-4" />
            <SkeletonText type="b5" className="mb-1" />
            <SkeletonText type="b5" className="w-10/12" />
          </div>
        </div>
      )}
      {type === 'large' && (
        <div className="flex gap-5 py-8 border-b border-b-grayscale-400 last-of-type:border-none last-of-type:pb-0 first:pt-0 items-center">
          <Skeleton className="w-[252px] h-[148px] rounded-2xl" />
          <div className="flex-1">
            <SkeletonText type="b3" className="w-7/12 mb-4" />
            <SkeletonText type="b5" className="mb-1" />
            <SkeletonText type="b5" className="w-10/12 mb-1" />
            <SkeletonText type="b5" className="w-7/12 mb-1" />
            <SkeletonText type="b5" className="mb-1" />
          </div>
        </div>
      )}
      {type === 'important' && (
        <div className="flex gap-5 items-center">
          <Skeleton className="rounded-3xl w-[338px] h-[240px]" />
          <div className="flex-1">
            <SkeletonText type="b1" className="mb-4 rounded-lg" />
            <div className="flex flex-col gap-2 pt-3">
              <SkeletonText type="b4" className="mb-1 rounded-lg" />
              <SkeletonText
                type="b4"
                className="mb-2 rounded-lg w-10/12"
              />
              <SkeletonText type="b4" className="mb-1 rounded-lg" />
              <SkeletonText
                type="b4"
                className="mb-1 rounded-lg w-9/12"
              />
              <SkeletonText
                type="b4"
                className="mb-1 rounded-lg w-11/12"
              />
            </div>
          </div>
        </div>
      )}
      {type === 'related' && (
        <div className="py-[10px]">
          <SkeletonText type="b4" className="mb-3" />
          <div className="flex gap-2">
            <SkeletonText type="b5" className="w-9" />
            <SkeletonText type="b5" className="w-20" />
          </div>
        </div>
      )}
    </>
  );
}
