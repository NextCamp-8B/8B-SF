import React from 'react';

type SkeletonProps = {
  className: string;
  children?: React.ReactNode;
};

export default function SkeletonWrapper({
  className,
  children,
}: SkeletonProps) {
  return (
    <div className={`bg-grayscale-300 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
