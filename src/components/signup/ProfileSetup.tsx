'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useInputChange from '@/hooks/input/useInputChange';
import Wrapper from '@/components/shared/Wrapper';
import { conceptMap } from '@/components/shared/input/inputConfig';
import useUserStore from '@/store/userStore';
import LoadingSpinner from '../shared/LoadingSpinner';
import AuthPopup from './Popup';
import usePageStore from '@/store/signupStepStore';
import ProfileDetails from '../shared/ProfileDetails';

// 마이페이지 설정에서 모달 과 회원가입 페이지에서 사용
export default function ProfileSetup() {
  const { clearUser } = useUserStore();
  const [errorMsg, setErrorMsg] = useState({ title: '', msg: '' }); //팝업에 에러 메세지
  const [isShowPopup, setIsShowPopup] = useState(false); // 팝업 조건부 렌더링
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const { value, onChangeInputValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const [stock, setStock] = useState(''); //관심종목

  const [profileImage, setProfileImage] = useState(''); //base54 프로필 이미지
  const [profileFile, setProfileFile] = useState<File>(); // 프로필 이미지 파일
  //프로필 이미지 / null 값은 기본이미지
  const { setPageStep } = usePageStore(); //페이지 이동

  //에러발생 팝업
  const handleClosePopuup = () => {
    setIsShowPopup(false);
  };

  const validateForm = useCallback(() => {
    const isNicknameValid = conceptMap.nickname.doValidation(
      value.nickname,
    );
    setIsFormValid(isNicknameValid);
  }, [value.nickname]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleStockChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStock(e.target.value);
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return console.log('isFormValid unset');
    setIsFormValid(false);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('nickname', value.nickname.trim());
    formData.append('interestStock', stock);
    formData.append('profileImg', profileFile as File);

    // Zustand에서 유저 정보 가져오기 (회원가입일 경우)
    const updatedUser = useUserStore.getState().user;
    Object.entries(updatedUser).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        clearUser(); // Zustand 스토리지에서 유저 데이터 삭제
        setPageStep('welcome');
      } else {
        setErrorMsg({
          title: '회원가입 오류',
          msg: '죄송합니다. 오류가 발생했습니다. 회원가입을 처음부터 다시 시도하시거나, 고객센터에 문의해주세요.',
        });
        throw new Error('회원가입 실패');
      }
    } catch (error) {
      console.error('프로필 설정 실패:', error);
      setIsShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result?.toString() as string;
        setProfileImage(base64String); //프론트에서 보여질 이미지
        setProfileFile(file); //api 보낼 이미지 파일
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* 에러메시지 팝업 */}
      {isShowPopup && (
        <AuthPopup
          onClose={handleClosePopuup}
          error={true}
          title={errorMsg.title}
          errorMessage={errorMsg.msg}
        />
      )}
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col justify-start w-[386px] h-full">
          <h3 className="h3 font-bold text-center mb-8 text-primary-900">
            프로필 설정
          </h3>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <ProfileDetails
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              nickname={value.nickname}
              onChangeNickname={onChangeInputValue}
              isSubmit={isSubmit}
              stock={stock}
              handleStockChange={handleStockChange}
              onHandleSubmit={onHandleSubmit}
              buttonText="가입하기"
            />
          )}
        </div>
      </Wrapper>
    </>
  );
}
