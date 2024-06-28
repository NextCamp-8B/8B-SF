'use client';
import React from 'react';
import CheckBox from '@/components/shared/Checkbox';

type AgreementBoxProps = {
  title: string;
  content: string;
  checkboxLabel: string;
  checked: boolean;
  onChange: () => void;
};

export default function AgreementBox({
  title,
  content,
  checkboxLabel,
  checked,
  onChange,
}: AgreementBoxProps) {
  return (
    <div className="flex flex-col gap-y-2 mb-4">
      <div className="w-full flex justify-between items-center">
        <span className="b3">{title}</span>
      </div>
      <div className="w-full h-[192px] border border-grayscale-300 rounded-lg overflow-y-auto p-4 b4">
        <p>{content}</p>
      </div>
      <div className="w-full flex justify-end">
        <CheckBox.Rounded
          label={checkboxLabel}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
