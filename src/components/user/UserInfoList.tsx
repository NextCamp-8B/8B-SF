import React from 'react';
import UserInfo from './UserInfo';

type UserInfoListProps = {
  userInfo: { label: string; value: string }[];
};

export default function UserInfoList({
  userInfo,
}: UserInfoListProps) {
  return (
    <div className="flex flex-col gap-y-4 mt-2">
      {userInfo.map((info, index) => (
        <UserInfo key={index} label={info.label} value={info.value} />
      ))}
    </div>
  );
}
