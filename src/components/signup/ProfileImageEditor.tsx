import React from 'react';
import Image from 'next/image';
import ProfileSvg from '@/assets/icons/profile.svg';
import Pencial from '@/assets/icons/pencil.svg';

type ProfileImageEditor = {
  profileImage: string | null;
  handleImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};
// 프로필 이미지 설정
export default function ProfileImageEditor({
  profileImage,
  handleImageUpload,
}: ProfileImageEditor) {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="relative w-32 h-32">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <ProfileSvg className="w-full h-full object-cover rounded-full" />
        )}
        <label
          htmlFor="profileImage"
          className="absolute bottom-0 right-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer bg-grayscale-400"
        >
          <Pencial className="w-6 h-6 h1" />
          <input
            type="file"
            id="profileImage"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
}
