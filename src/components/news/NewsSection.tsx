import React from 'react';

type NewsSectionProps = {
  children: React.ReactNode;
};

export default function NewsSection({ children }: NewsSectionProps) {
  return <section className="w-[1200px]">{children}</section>;
}
