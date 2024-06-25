import React from 'react';

type NewsBorderProps = {
  children: React.ReactNode;
};

export default function NewsBorder({ children }: NewsBorderProps) {
  return (
    <div className="border rounded-2xl border-primary-100 p-12 flex flex-col">
      {children}
    </div>
  );
}
