import NewsBorder from '@/components/news/NewsBorder';
import React from 'react';
import Skeleton from '../Skeleton';
import SkeletonNewsListItem from './SkeletonNewsListItem';

export default function SkeletonHomeRecentNews() {
  return (
    <NewsBorder>
      <div className="flex flex-col">
        <SkeletonNewsListItem type="medium" />
        <SkeletonNewsListItem type="medium" />
        <SkeletonNewsListItem type="medium" />
      </div>
    </NewsBorder>
  );
}
