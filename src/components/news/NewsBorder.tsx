import React from 'react';

type NewsBorderProps = {
  background?: 'white' | 'transparent';
  children: React.ReactNode;
};

export default function NewsBorder({
  children,
  background,
}: NewsBorderProps) {
  return (
    <div
      className={`border rounded-2xl border-primary-100 p-12 flex flex-col ${
        background === 'white' && 'bg-grayscale-0'
      }`}
    >
      {children}
    </div>
  );
}
