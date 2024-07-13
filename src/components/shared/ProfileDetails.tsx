'use client';

import React from 'react';
import InputSet from '@/components/shared/input/index';
import CompositeInput from '@/components/shared/input/CompositeInput/index';
import TextButton from '@/components/shared/buttons/TextButton';
import ProfileImageEditor from '../signup/ProfileImageEditor';

type TProfileDetails = {
  profileImage: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nickname: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmit: boolean;
  stock: string;
  handleStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSubmit: (e: React.FormEvent) => void;
  buttonText: string;
};

const ProfileDetails = ({
  profileImage,
  handleImageUpload,
  nickname,
  onChangeNickname,
  isSubmit,
  stock,
  handleStockChange,
  onHandleSubmit,
  buttonText,
}: TProfileDetails) => {
  return (
    <form onSubmit={onHandleSubmit}>
      <ProfileImageEditor
        profileImage={profileImage}
        handleImageUpload={handleImageUpload}
      />
      <InputSet className="flex flex-col gap-4">
        <InputSet.Validated
          onChange={onChangeNickname}
          value={nickname}
          type="text"
          concept="nickname"
          isSubmit={isSubmit}
        />
        <CompositeInput className="flex flex-col justify-between items-left max-w-[386px] gap-1">
          <CompositeInput.Label
            htmlFor="stock"
            className="b4 font-medium"
          >
            관심종목
          </CompositeInput.Label>
          <CompositeInput.Input
            id="stock"
            type="text"
            onChange={handleStockChange}
            value={stock}
            className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg"
            placeholder="#관심 종목을 추가해주세요"
          />
        </CompositeInput>
        <TextButton type="submit" className="w-full mt-8">
          {buttonText}
        </TextButton>
      </InputSet>
    </form>
  );
};

export default ProfileDetails;
