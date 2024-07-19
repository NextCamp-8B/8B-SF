import React from 'react';
import InputSet from '@/components/shared/input/index';
import CompositeInput from '@/components/shared/input/CompositeInput/index';
import TextButton from '@/components/shared/buttons/TextButton';
import ProfileImageEditor from '../signup/ProfileImageEditor';
import CompositeDropdown from './dropdown/compositeDropdown';
import { SelectedOption } from './dropdown/types';
import { renderDropdownOptions } from './dropdown/renderDropdownDoptions';
import { useTranslations } from 'next-intl';

type ProfileDetails = {
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
  setStock: (stock: string) => void;
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
  setStock,
  handleSelected,
  handleOptionsKey,
}: ProfileDetails) {
  const t = useTranslations();

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
            {t('MyPage.interest_stock')}
          </CompositeInput.Label>
          <CompositeInput.Input
            id="stock"
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg"
            placeholder={t('MyPage.placeholder_stock')}
          />
          {options?.length > 0 && stock.length > 0 && (
            <CompositeDropdown.Panel
              onClick={handleSelected}
              handleOptionsKey={handleOptionsKey}
              className="border border-grayscale-400 rounded-lg h-52 overflow-y-auto no-scrollbar"
            >
              {() =>
                renderDropdownOptions(
                  options,
                  selectedDataset,
                  focusedIndex,
                )
              }
            </CompositeDropdown.Panel>
          )}
        </CompositeInput>
        <TextButton type="submit" className="w-full mt-8">
          {buttonText}
        </TextButton>
      </InputSet>
    </form>
  );
}
