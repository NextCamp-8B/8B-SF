import React from 'react';
import InputSet from '@/components/shared/input/index';
import CompositeInput from '@/components/shared/input/CompositeInput/index';
import TextButton from '@/components/shared/buttons/TextButton';
import ProfileImageEditor from '../signup/ProfileImageEditor';
import CompositeDropdown from './dropdown/compositeDropdown';
import { SelectedOption } from './dropdown/types';
import { renderDropdownOptions } from './dropdown/renderDropdownDoptions';

type TProfileDetails = {
  profileImage: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nickname: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmit: boolean;
  onHandleSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  options: SelectedOption[];
  selectedDataset: string;
  focusedIndex: number;
  stock: string;
  handleSelected: (value: string) => void;
  handleOptionsKey: (e: React.KeyboardEvent) => void;
};

export default function ProfileDetails({
  profileImage,
  handleImageUpload,
  nickname,
  onChangeNickname,
  isSubmit,
  onHandleSubmit,
  buttonText,
  options,
  selectedDataset,
  focusedIndex,
  stock,
  handleSelected,
  handleOptionsKey,
}: TProfileDetails) {
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
            value={stock}
            className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg"
            placeholder="#관심 종목을 추가해주세요"
          />
          <CompositeDropdown.Panel
            onClick={handleSelected}
            handleOptionsKey={handleOptionsKey}
          >
            {() =>
              renderDropdownOptions(
                options,
                selectedDataset,
                focusedIndex,
              )
            }
          </CompositeDropdown.Panel>
        </CompositeInput>
        <TextButton type="submit" className="w-full mt-8">
          {buttonText}
        </TextButton>
      </InputSet>
    </form>
  );
}
