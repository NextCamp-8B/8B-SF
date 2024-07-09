import React from 'react';
type MyPageSectionProps = {
  children: React.ReactNode;
  className?: string;
};
export default function MyPageSection({
  children,
  className = '',
}: MyPageSectionProps) {
  return (
    <>
      <section className={`flex flex-col ${className}`}>
        {children}
      </section>
    </>
  );
}
