// components/LoadingSpinnerWrapper.js
import React from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

type LoadingSpinnerWrapper = {
  isLoading: boolean;
  children: React.ReactNode;
};

export default function LoadingSpinnerWrapper({
  isLoading,
  children,
}: LoadingSpinnerWrapper) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return children;
}
