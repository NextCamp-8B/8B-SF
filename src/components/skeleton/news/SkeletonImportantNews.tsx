import NewsBorder from '@/components/news/NewsBorder';
import React from 'react';
import SkeletonNewsListItem from './SkeletonNewsListItem';

export default function SkeletonImportantNews() {
  return (
    <NewsBorder>
      <SkeletonNewsListItem type="important" />
    </NewsBorder>
  );
}
