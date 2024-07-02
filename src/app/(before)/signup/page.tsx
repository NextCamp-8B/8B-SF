'use client';
import React, { useEffect, useState } from 'react';
import Agreement from '@/components/signup/Agreement';
import Auth from '@/components/signup/Auth';
import SignupForm from '@/components/signup/SignupForm';
import ProfileSetup from '@/components/signup/ProfileSetup';
import Welcome from '@/components/signup/Welcome';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import useUserStore from '@/store/userStore';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
// 페이지 스텝 타입 정의
export type PageStep =
  | 'agreement'
  | 'auth'
  | 'signupForm'
  | 'profile'
  | 'welcome';

export default function Signup() {
  const { clearUser } = useUserStore();

  const router = useRouter();
  const [pageStep, setPageStep] = useState<PageStep>('agreement');
  const searchParams = useSearchParams();

  const changePage = (nextPage: PageStep) => {
    setPageStep(nextPage);
  };

  useEffect(() => {
    //route 인증링크 전송 시  route에서 쿠키에 저장한 auth-token
    // 인증링크를 통해 params로 들어온 token을 비교
    const token = Cookies.get('auth-token');
    const paramsToken = searchParams.get('token');
    // console.log('token', token);
    if (token === paramsToken) {
      try {
        // token과 secret 값을 비교
        jwt.verify(token, secret);
        setPageStep('signupForm');
      } catch (e) {
        console.log('일로 들어옴?', token, paramsToken)
        console.error('Invalid token:', e);
        router.push('/signup'); // 유효하지 않은 경우 리디렉션
        clearUser();
      }
    }
  }, [searchParams, router]);

  const mainMarginClass = pageStep === 'agreement' ? 'mt-12' : '';
  return (
    <main
      className={`flex justify-center items-center ${mainMarginClass}`}
    >
      {pageStep === 'agreement' && (
        // 이용 약관
        <Agreement changePage={() => changePage('auth')} />
      )}
      {pageStep === 'auth' && (
        // 이메일 링크 인증
        <Auth />
      )}
      {pageStep === 'signupForm' && (
        // 회원가입
        <SignupForm changePage={() => changePage('profile')} />
      )}
      {pageStep === 'profile' && (
        // 프로필 설정
        <ProfileSetup
          buttonText="가입하기"
          changePage={() => changePage('welcome')}
        />
      )}
      {pageStep === 'welcome' && <Welcome />}
    </main>
  );
}
