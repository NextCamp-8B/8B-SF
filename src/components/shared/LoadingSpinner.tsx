import React from 'react';
import Logo from '@/assets/logos/logo_dark.svg';

export default function LoadingSpinner() {
  return (
    <div className="animate-pulse w-fit flex flex-col items-center">
      <Logo />
      <div className="w-16 h-16 relative rounded-full border-8 border-primary-900 border-t-primary-50 animate-spin"></div>
    </div>
  );
}
