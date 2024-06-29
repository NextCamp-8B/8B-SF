import React from 'react';

type UserInfoProps = {
  label: string;
  value: string;
};

export default function UserInfo({ label, value }: UserInfoProps) {
  return (
    <div className="flex gap-x-32">
      <h3 className="b3 font-semibold w-20">{label}</h3>
      <span>{value}</span>
    </div>
  );
}
