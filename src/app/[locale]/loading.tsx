import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Wrapper from '@/components/shared/Wrapper';
import React from 'react';

export default function Loading() {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-background-100">
      <Wrapper width="w-64 h-64">
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Wrapper>
    </main>
  );
}
