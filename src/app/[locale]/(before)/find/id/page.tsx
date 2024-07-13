'use client';
import { useState, useEffect, useCallback } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import { conceptMap } from '@/components/shared/input/inputConfig';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import FindIdResult from '@/components/findId/FindIdResult';
import AuthPopup from '@/components/signup/Popup';
import LoadingSpinnerWrapper from '@/components/shared/LoadingSpinnerWrapper';

// 사용자 경험을 위해 비밀번호 찾기 추가
// 소셜로그인 id를 찾았다면 찾은 유저id에 해당 소셜로그인 로고 추가
// 현재 ui부분에서 이름과 비밀번호 입력시 버튼 활성화

export default function FindId() {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccessFindId, setISuccessFindId] = useState(false); //아이디 찾기 성공 여부
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const [isLoading, setIsLoading] = useState(false); //로딩스피너 처리
  const [isShowPopup, setIsShowPopup] = useState(false); // 해당하는 유저 없을 시 에러팝업

  // user 정보
  const [findUserId, setFindUserId] = useState<{
    user_id: string;
    created_at: string;
    social?: string;
  } | null>(null);

  const validateForm = useCallback(() => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isPhoneValid = conceptMap.loginPhone.doValidation(
      value.loginPhone,
    );
    setIsFormValid(isNameValid && isPhoneValid);
  }, [value.name, value.loginPhone]);

  // data 연동
  const fetchData = async () => {
    setIsLoading(true);
    setIsSubmit(true);
    const response = await fetch('/api/find/id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: value.name,
        phone_number: value.loginPhone,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      setFindUserId({
        user_id: data.user_id,
        created_at: new Date(data.created_at).toLocaleDateString(),
        social: data?.provider_account_id,
      });
      setISuccessFindId(true);
    } else {
      setISuccessFindId(false);
      setIsShowPopup(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // 에러 팝업 닫기
  const handleClosePopuup = () => {
    setIsShowPopup(false);
  };

  const titleMarginBottom = isSuccessFindId ? 'mb-6' : 'mb-10';
  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={handleClosePopuup}
          error={true}
          title={'아이디 찾기 실패'}
          errorMessage={
            '이메일, 휴대폰번호와 일치하는 유저가 없습니다.'
          }
        />
      )}
      <main className="flex justify-center items-center h-screen">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col items-center w-96 h-full ">
            <h3
              className={`h3 font-bold text-center ${titleMarginBottom} text-primary-900`}
            >
              아이디 찾기
            </h3>
            {isSuccessFindId && findUserId ? (
              <>
                <h5 className="b5 mb-4 font-medium text-center">
                  휴대폰 번호와 일치하는 아이디 입니다.
                </h5>
                <FindIdResult
                  userId={findUserId.user_id}
                  createdAt={findUserId.created_at}
                  social={findUserId?.social}
                />
              </>
            ) : (
              <LoadingSpinnerWrapper isLoading={isLoading}>
                <InputSet className="flex flex-col gap-4">
                  {/* 이름 / 휴대폰번호 입력 폼 */}
                  <InputSet.Validated
                    onChange={onChangeInputValue}
                    value={value.name}
                    type="text"
                    isSubmit={isSubmit}
                    concept="name"
                  />
                  <InputSet.Validated
                    onChange={onChangeInputValue}
                    value={value.loginPhone}
                    isSubmit={isSubmit}
                    type="text"
                    concept="loginPhone"
                  />
                  {/* submit 아이디 찾기 버튼 */}
                  <TextButton
                    className="mt-8"
                    disabled={!isFormValid}
                    onClick={fetchData}
                  >
                    아이디 찾기
                  </TextButton>
                </InputSet>
              </LoadingSpinnerWrapper>
            )}
          </div>
        </Wrapper>
      </main>
    </>
  );
}
