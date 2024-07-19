import React from 'react';

type UserInfo = {
  label: string;
  value: string;
};

export default function UserInfo({ label, value }: UserInfo) {
  return (
    <div className="flex gap-x-32">
      <h3 className="b3 font-semibold w-20 whitespace-nowrap">
        {label}
      </h3>
      <span>{value}</span>
    </div>
  );
}
