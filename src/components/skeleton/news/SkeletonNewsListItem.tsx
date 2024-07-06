import React from 'react';
import Skeleton from '../Skeleton';
import { NewsListItemProps } from '@/components/shared/NewsListItem';

type SkeletonNewsListItemProps = Pick<NewsListItemProps, 'type'>;

export default function SkeletonNewsListItem({
  type = 'medium',
}: SkeletonNewsListItemProps) {
  return (
    <>
      {type === 'medium' && (
        <div className="flex gap-5 py-8 border-b border-b-grayscale-400 last-of-type:border-none last-of-type:pb-0 first:pt-0 ">
          <Skeleton className="w-[172px] h-[100px] rounded-2xl" />
          <div className="flex-1">
            <Skeleton className="h-7 rounded-lg w-7/12 mb-4" />
            <Skeleton className="h-5 rounded-md  mb-1" />
            <Skeleton className="h-5 rounded-md w-10/12" />
          </div>
        </div>
      )}
      {type === 'important' && (
        <div className="flex gap-5">
          <Skeleton className="rounded-3xl w-[338px] h-[240px]" />
          <div className="flex-1">
            <Skeleton className="h-8 mb-4 rounded-lg" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 rounded-lg" />
              <Skeleton className="h-7 rounded-lg w-10/12" />
              <Skeleton className="h-7 rounded-lg " />
              <Skeleton className="h-7 rounded-lg w-9/12" />
              <Skeleton className="h-7 rounded-lg w-11/12" />
            </div>
          </div>
        </div>
      )}
      {type === 'related' && (
        <div className="py-[10px]">
          <Skeleton className="h-4 rounded-md mb-3" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-9 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>
      )}
    </>
  );
}
