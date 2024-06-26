'use client';
import { useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import CheckBox from '@/components/shared/Checkbox';
import IconButton from '@/components/shared/buttons/IconButton';
import Link from 'next/link';
import GoogleLogo from '@/assets/icons/google_logo.svg';

// w-[590px]  h-[668px]

export default function Login() {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <main className="flex justify-center items-center h-screen">
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col w-96 h-full">
          <h3 className="h3 font-bold text-center mb-10 text-primary-900">
            로그인
          </h3>

          {/* 로그인 입력 폼 */}
          <InputSet className="flex flex-col gap-4">
            <InputSet.Validated
              onChange={onChangeInputValue}
              value={value.signupId}
              type="text"
              concept="signupId"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={onChangeInputValue}
              value={value.password}
              type="password"
              concept="password"
              isSubmit={isSubmit}
            />
            <TextButton
              onClick={() => {
                setIsSubmit(true);
              }}
            >
              로그인
            </TextButton>
          </InputSet>

          {/* 자동로그인, 아이디, 비밀번호 찾기 라우트 */}
          <div className="flex flex-col mt-4 gap-y-4">
            <div className="flex px-1 justify-between font-nomal b5">
              <CheckBox label="자동 로그인" />
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

            {/* submit 로그인 버튼 */}

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
            <Link href="#">
              <IconButton.Kakao />
            </Link>
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
