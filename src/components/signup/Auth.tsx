'use client';
import React, { useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';
import { conceptMap } from '@/components/shared/input/inputConfig';

import AuthPopup from './Popup';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function Auth() {
  const [isShowPopup, setIsShowPopup] = useState(false); // 팝업 조건부 렌더링
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const { value, onChangeInputValue } = useInputChange(); // Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [authError, setAuthError] = useState({
    // 인증링크 전송 중 에러
    isError: false,
    message: null,
  });
  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 체크

  const validateForm = () => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isEmailValid = conceptMap.email.doValidation(value.email);
    setIsFormValid(isNameValid && isEmailValid);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
    validateForm();
  };

  const handleClosePopuup = () => {
    setIsShowPopup(false);
  };

  const onHandleSubmit = async () => {
    setAuthError({ isError: false, message: null });
    setIsSubmit(true);
    setIsLoading(true);
    if (!isFormValid) {
      console.log('fomrvalid unset');
      setIsLoading(false);
      return;
    }
    // 유효성 검사가 성공했다면
    // 인증번호 링크 보내기
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: value.name,
          email: value.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('data', data);
        setIsLoading(false);
        // 입력 필드 초기화
        value.name = '';
        value.email = '';
      } else {
        const errorData = await response.json();
        setAuthError({ isError: true, message: errorData.message }); // 서버로부터 받은 에러 메시지를 상태에 저장
      }
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
      setAuthError({ isError: true, message: null });
    } finally {
      // 이메일 전송 성공/실패 팝업 발생
      setIsShowPopup(true);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={handleClosePopuup}
          error={authError.isError}
          errorMessage={authError.message}
        />
      )}
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col justify-start w-[386px] h-full">
          <h3 className="h3 font-bold text-center mb-10 text-primary-900">
            본인인증
          </h3>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <InputSet className="flex flex-col gap-4">
              <InputSet.Validated
                onChange={handleInputChange}
                value={value.name}
                type="text"
                concept="name"
                isSubmit={isSubmit}
              />
              <InputSet.Validated
                onChange={handleInputChange}
                value={value.email}
                type="text"
                concept="email"
                isSubmit={isSubmit}
              />
              <TextButton
                onClick={onHandleSubmit}
                className="w-full mx-auto mt-8"
              >
                인증링크 전송
              </TextButton>
            </InputSet>
          )}
        </div>
      </Wrapper>
    </>
  );
}
