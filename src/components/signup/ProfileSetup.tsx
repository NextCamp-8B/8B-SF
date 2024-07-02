'use client';

import React, { useCallback, useEffect, useState } from 'react';
import InputSet from '@/components/shared/input/index';
import CompositeInput from '@/components/shared/input/CompositeInput/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';
import { conceptMap } from '@/components/shared/input/inputConfig';
import ProfileSvg from '@/assets/icons/profile.svg';
import Pencial from '@/assets/icons/pencil.svg';
import Image from 'next/image';
import useUserStore from '@/store/userStore';
import LoadingSpinner from '../shared/LoadingSpinner';
import AuthPopup from './Popup';

type ProfileSetupProps = {
  changePage: () => void;
  buttonText: string;
  isModal?: boolean; // 모달 여부를 판단하는 props 추가
  onClose?: () => void; // onClose prop 추가
};

// 마이페이지 설정에서 모달 과 회원가입 페이지에서 사용
export default function ProfileSetup({
  changePage,
  buttonText,
  onClose,
  isModal = false, // 기본값은 false
}: ProfileSetupProps) {
  const { user, setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [stock, setStock] = useState(''); //관심종목
  const [profileImage, setProfileImage] = useState<string | null>(
    null,
  );

  const validateForm = useCallback(() => {
    const isNicknameValid = conceptMap.nickname.doValidation(
      value.nickname,
    );
    setIsFormValid(isNicknameValid);
  }, [value.nickname]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
  };

  const handleStockChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStock(e.target.value);
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    setIsSubmit(true);
    if (!isFormValid) return console.log('isFormValid unset');
    setIsFormValid(false);
    setIsLoading(true);
    setUser({
      profileImg: profileImage || '',
      nickname: value.nickname,
      interestStock: stock,
    });
    // Zustand에서 유저 정보 가져오기
    const updatedUser = useUserStore.getState().user;
    console.log(updatedUser, 'updatedUser');
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        clearUser(); // Zustand 스토리지에서 유저 데이터 삭제
        changePage();
      }
    } catch (error) {
      console.error('프로필 설정 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const content = (
    // <AuthPopup error={true} errorMessage={'죄송합니다. 오류가 발생했습니다. 회원가입을 처음부터 디시 시도하시거나, 고객센터에 문의해주세요.'}/>
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-8 text-primary-900">
          프로필 설정
        </h3>
        {/* 프로필 이미지 */}
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-10">
              <div className="relative w-32 h-32">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={10}
                    height={10}
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
            {/* 닉네임 */}
            <InputSet className="flex flex-col gap-4">
              <InputSet.Validated
                onChange={handleInputChange}
                value={value.nickname}
                type="text"
                concept="nickname"
                isSubmit={isSubmit}
              />
              {/* 관심종목 */}
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
              {/* 가입하기 버튼 */}
              <TextButton
                disabled={!isFormValid}
                onClick={onHandleSubmit}
                className="w-full mt-8"
              >
                {buttonText}
              </TextButton>
            </InputSet>
          </>
        )}
      </div>
    </Wrapper>
  );

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 bg-grayscale-900 bg-opacity-65 flex justify-center items-center h-[100%] w-[100%]"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()}>{content}</div>
      </div>
    );
  }

  return content;
}
