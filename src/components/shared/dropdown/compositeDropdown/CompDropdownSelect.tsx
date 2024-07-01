import { useState } from 'react';

export default function CompDropdownSelect({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div tabIndex={0} className={`${className} `}>
      {children}
    </div>
  );
}
