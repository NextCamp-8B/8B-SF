'use client';
import React, { useCallback, useEffect, useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';

import { conceptMap } from '@/components/shared/input/inputConfig';
import AuthPopup from '@/components/signup/Popup';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useSearchParams } from 'next/navigation';
import FindPwResult from '@/components/findPw/FindPwResult';

export default function UpdatedPw() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code'); //supabase에서 비밀번호리셋 jwt제공

  const [isLoading, setIsLoading] = useState(false); //api 로딩 스피너
  const { value, onChangeInputValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 체크
  const [errorMsg, setErrorMsg] = useState(''); // 비밀번호 변경 에러 메세지

  const [isShowPopup, setIsShowPopup] = useState(false); //에러 팝업
  const [isSuccessReset, setIsSuccessReset] = useState(false); //비밀번호 찾기 성공 여부
  const [refreshToken, setRefreshToken] = useState<string | null>(
    null,
  ); //token을 재요청할 refresh tokn

  // 폼 입력시 유효성 검사
  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    const isPasswordCheckValid =
      value.password === value.passwordCheck;
    setIsFormValid(isPasswordValid && isPasswordCheckValid);
  }, [value.password, value.passwordCheck]);

  useEffect(() => {
    validateForm();
  }, [value, validateForm]);

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    setIsLoading(true);
    const response = await fetch('/api/reset/pw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: value.password.trim(),
        code: code,
        refreshToken: refreshToken,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setIsSuccessReset(true);
    } else {
      // 에러 팝업 발생
      setRefreshToken(result?.refreshToken);
      setIsShowPopup(true);
      setErrorMsg(result.error || '입력한 내용을 다시 확인해주세요.');
    }
    setIsLoading(false);
  };

  // 팝업 닫기
  const handleClosePopuup = () => {
    setIsShowPopup(false);
  };

  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={handleClosePopuup}
          error={true}
          title="비밀번호 재설정 오류"
          errorMessage={errorMsg}
        />
      )}
      <main className="flex justify-center items-center h-screen">
        {isSuccessReset ? (
          <FindPwResult />
        ) : (
          <Wrapper padding="px-24 py-20" width="w-[590px]">
            <div className="flex flex-col justify-start w-[386px] m-auto">
              <h3 className="h3 font-bold text-center mb-10 text-primary-900">
                비밀번호 변경
              </h3>
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <form onSubmit={onHandleSubmit}>
                  <InputSet className="flex flex-col gap-4">
                    <InputSet.Validated
                      onChange={onChangeInputValue}
                      value={value.password}
                      type="password"
                      concept="password"
                      isSubmit={isSubmit}
                    />
                    <InputSet.Validated
                      onChange={onChangeInputValue}
                      value={value.passwordCheck}
                      password={value.password}
                      type="password"
                      concept="passwordCheck"
                      isSubmit={isSubmit}
                    />
                    <TextButton className="w-full mx-auto mt-8">
                      확인
                    </TextButton>
                  </InputSet>
                </form>
              )}
            </div>
          </Wrapper>
        )}
      </main>
    </>
  );
}
