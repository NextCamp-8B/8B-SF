import React from 'react';

type NewsHeadingProps = {
  children: React.ReactNode;
};

export default function NewsHeading({ children }: NewsHeadingProps) {
  return (
    <h1 className="h4 font-bold pb-6 text-primary-900">{children}</h1>
  );
}
