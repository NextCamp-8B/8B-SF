import React from 'react';

type NewsHeadingProps = {
  children: React.ReactNode;
  size?: 'large' | 'medium';
};

export default function NewsHeading({
  children,
  size = 'large',
}: NewsHeadingProps) {
  return (
    <>
      {size === 'large' && (
        <h1 className="h4 font-bold pb-6 text-primary-900">
          {children}
        </h1>
      )}
      {size === 'medium' && (
        <h3 className="b1 font-medium text-primary-900 pb-4">
          {children}
        </h3>
      )}
    </>
  );
}
