import React from 'react';
import TextButton from '@/components/shared/buttons/TextButton';

type SectionBoxProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const SectionBox: React.FC<SectionBoxProps> = ({
  title,
  description,
  children,
}) => {
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
};

export default SectionBox;
