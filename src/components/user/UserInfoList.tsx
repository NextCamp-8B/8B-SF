import React from 'react';
import UserInfo from './UserInfo';

type UserInfoList = {
  userInfo: { label: string; value: string }[];
};

export default function UserInfoList({ userInfo }: UserInfoList) {
  return (
    <div className="flex flex-col gap-y-4 mt-2">
      {userInfo.map((info, index) => (
        <UserInfo key={index} label={info.label} value={info.value} />
      ))}
    </div>
  );
}
