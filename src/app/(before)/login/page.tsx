'use client';
import { useCallback, useEffect, useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import CheckBox from '@/components/shared/Checkbox';
import IconButton from '@/components/shared/buttons/IconButton';
import Link from 'next/link';
import { conceptMap } from '@/components/shared/input/inputConfig';
import { signIn } from 'next-auth/react';

// w-[590px]  h-[668px]

export default function Login() {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); //유효성 검사폼

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return console.log('isFormValid unset');
    const loginInfo = {
      userId: value.loginId,
      password: value.password,
    };
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });
    console.log(response, 'response');

    if (response.ok) {
      const { data } = await response.json();
      const token = data.session.access_token; // 세션 토큰 저장
      localStorage.setItem('access-token', token);
    } else {
      console.error('프로필 설정 실패:', await response.json());
    }
  };
  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    const isLoginIdValid = conceptMap.loginId.doValidation(
      value.loginId,
    );

    setIsFormValid(isLoginIdValid && isPasswordValid);
  }, [value.loginId, value.password]);

  useEffect(() => {
    validateForm();
  }, [value, validateForm]);

  const handleKakakoLogin = async () => {
    await signIn('kakao');
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col w-96 h-full">
          <h3 className="h3 font-bold text-center mb-10 text-primary-900">
            로그인
          </h3>

          {/* 로그인 입력 폼 */}
          <form onSubmit={onHandleSubmit}>
            <InputSet className="flex flex-col gap-4">
              <InputSet.Validated
                onChange={onChangeInputValue}
                value={value.loginId}
                type="loginId"
                concept="loginId"
                isSubmit={isSubmit}
              />
              <InputSet.Validated
                onChange={onChangeInputValue}
                value={value.password}
                type="password"
                concept="password"
                isSubmit={isSubmit}
              />
              {/* submit 로그인 버튼 */}
              <TextButton>로그인</TextButton>
            </InputSet>
          </form>

          {/* 자동로그인, 아이디, 비밀번호 찾기 라우트 */}
          <div className="flex flex-col mt-4 gap-y-4">
            <div className="flex px-1 justify-between font-nomal b5">
              <CheckBox
                label="자동 로그인"
                checked={isAutoLogin}
                onChange={() => setIsAutoLogin(!isAutoLogin)}
              />
              <div className="space-x-2">
                <Link
                  href="/find/id"
                  className="text-sm text-blue-500 hover:underline"
                >
                  아이디 찾기
                </Link>
                <span>|</span>
                <Link
                  href="/find/pw"
                  className="text-sm text-blue-500 hover:underline"
                >
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            {/* 회원가입 라우트*/}
            <div className="flex justify-between px-1 b5">
              <p className="text-sm">아직 회원이 아니신가요? </p>
              <Link
                href="/signup"
                className="text-secondary-600 underline"
              >
                아잇나우 회원가입
              </Link>
            </div>

            <div className="relative flex items-center justify-center my-2 b5">
              <div className="absolute inset-0 flex items-center">
                <hr className="w-full border-t border-grayscale-400" />
              </div>
              <div className="relative bg-grayscale-0 px-2 text-grayscale-600">
                또는
              </div>
            </div>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <IconButton.Kakao onClick={handleKakakoLogin} />
            <Link href="#">
              <IconButton.Naver />
            </Link>
            <Link href="#">
              <IconButton.Google />
            </Link>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
