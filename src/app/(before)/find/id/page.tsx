'use client';
import { useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Link from 'next/link';
import {
  conceptMap,
  statusMap,
} from '@/components/shared/input/inputConfig';
import KakaoLogo from '@/assets/icons/kakao_logo.svg';
import NaverLogo from '@/assets/icons/naver_logo.svg';
import GoogleLogo from '@/assets/icons/google_logo.svg';

// 사용자 경험을 위해 비밀번호 찾기 추가
// 소셜로그인 id를 찾았다면 찾은 유저id에 해당 소셜로그인 로고 추가
// 현재 ui부분에서 이름과 비밀번호 입력시 버튼 활성화
// 버튼 클릭 시 더미 유저 정보출력

export default function FindId() {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccessFindId, setISuccessFindId] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // 현재 ui부문에서 dummy로 유저 데이터 출력

  const socialLogo = {
    kakao: <KakaoLogo className="w-6 h-6 rounded-full" />,
    naver: <NaverLogo className="w-6 h-6 rounded-full" />,
    google: <GoogleLogo className="w-6 h-6 rounded-full" />,
  };
  const findUserInfo = {
    id: 'sfacspaceid',
    date: '2023.06.14',
    social: 'google',
  };

  const validateForm = () => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isPhoneValid = conceptMap.loginPhone.doValidation(
      value.loginPhone,
    );
    setIsFormValid(isNameValid && isPhoneValid);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
    validateForm();
  };

  const titleMarginBottom = isSuccessFindId ? 'mb-6' : 'mb-10';
  return (
    <main className="flex justify-center items-center h-screen">
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col items-center w-96 h-full ">
          <h3
            className={`h3 font-bold text-center ${titleMarginBottom}`}
          >
            아이디 찾기
          </h3>
          {isSuccessFindId ? (
            <>
              <h5 className="b5 mb-4 font-medium text-center">
                휴대폰 번호와 일치하는 아이디 입니다.
              </h5>
              <div className="flex flex-col items-center justify-center gap-4 border border-grayscale-300 rounded-lg w-full h-32 ">
                <div className="w-full flex flex-col items-center justify-center gap-y-4">
                  <div className="w-1/2 flex justify-center">
                    <div className="flex w-full text-left ">
                      아이디 :
                      {findUserInfo.social && (
                        <span className="ml-2">
                          {socialLogo[findUserInfo.social]}
                        </span>
                      )}
                      <span className="ml-1">{findUserInfo.id}</span>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="w-full text-left">
                      가입일 :
                      <span className="ml-2">
                        {findUserInfo.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/login" className="flex justify-center">
                <TextButton className="mt-8">로그인 하기</TextButton>
              </Link>
              <Link href="/find/pw" className="flex justify-center">
                <TextButton className="mt-4">
                  비밀번호 찾기
                </TextButton>
              </Link>
            </>
          ) : (
            <>
              {/* 이름 / 휴대폰번호 입력 폼 */}
              <InputSet className="flex flex-col gap-4">
                <InputSet.Validated
                  onChange={handleInputChange}
                  value={value.name}
                  type="text"
                  isSubmit={isSubmit}
                  concept="name"
                />
                <InputSet.Validated
                  onChange={handleInputChange}
                  value={value.loginPhone}
                  isSubmit={isSubmit}
                  type="text"
                  concept="loginPhone"
                />
                {/* submit 아이디 찾기 버튼 */}
                <TextButton
                  className="mt-8"
                  disabled={!isFormValid}
                  onClick={() => {
                    setIsSubmit(true);
                    console.log('click');
                    setISuccessFindId(true);
                  }}
                >
                  아이디 찾기
                </TextButton>
              </InputSet>
            </>
          )}
        </div>
      </Wrapper>
    </main>
  );
}
