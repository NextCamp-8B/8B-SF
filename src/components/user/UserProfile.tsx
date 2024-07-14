import React from 'react';
import Image from 'next/image';
import ProfileSvg from '@/assets/icons/profile.svg';

type TUserProfile = {
  profileImg?: string;
  nickname: string;
};

export default function UserProfile({
  profileImg,
  nickname,
}: TUserProfile) {
  return (
    <div className="flex gap-x-32">
      <h3 className="b3 font-semibold">프로필 선택</h3>
      <div className="flex items-center justify-between gap-x-4">
        {profileImg ? (
          <div className="relative w-14 h-14 ">
            <Image
              src={profileImg as string}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="w-14 h-14 rounded-full"
            />
          </div>
        ) : (
          <ProfileSvg className="w-14 h-14 rounded-full" />
        )}
        <span className="font-bold">{nickname}</span>
      </div>
    </div>
  );
}
