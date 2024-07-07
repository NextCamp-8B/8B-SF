import NewsBorder from '@/components/news/NewsBorder';
import React from 'react';
import SkeletonNewsListItem from './SkeletonNewsListItem';

export default function SkeletonRecentNews() {
  return (
    <NewsBorder background="white">
      <div className="flex flex-col">
        <SkeletonNewsListItem type="large" />
        <SkeletonNewsListItem type="large" />
        <SkeletonNewsListItem type="large" />
      </div>
    </NewsBorder>
  );
}
