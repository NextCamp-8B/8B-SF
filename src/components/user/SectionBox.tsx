import React from 'react';

type SectionBox = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function SectionBox({
  title,
  description,
  children,
}: SectionBox) {
  return (
    <div className="flex justify-between mb-10">
      <div>
        <h2 className="b2 font-bold mb-4 text-primary-900">
          {title}
        </h2>
        <p className="b4 font-medium mb-6">{description}</p>
      </div>
      {children}
    </div>
  );
}
