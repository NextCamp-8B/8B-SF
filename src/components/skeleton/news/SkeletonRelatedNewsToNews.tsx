import React from 'react';
import SkeletonNewsListItem from './SkeletonNewsListItem';

export default function SkeletonRelatedNewsToNews() {
  return (
    <div>
      <SkeletonNewsListItem type="related" />
      <SkeletonNewsListItem type="related" />
      <SkeletonNewsListItem type="related" />
    </div>
  );
}
