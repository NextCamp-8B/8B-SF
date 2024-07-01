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

const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
// 페이지 스텝 타입 정의
export type PageStep =
  | 'agreement'
  | 'auth'
  | 'signupForm'
  | 'profile'
  | 'welcome';

export default function Signup() {
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
    if (token && paramsToken && token === paramsToken) {
      try {
        // token과 secret 값을 비교?
        jwt.verify(token, secret);
        setPageStep('signupForm');
      } catch (e) {
        console.error('Invalid token:', e);
        router.push('/signup'); // 유효하지 않은 경우 리디렉션
      }
    }
  }, [searchParams, router]);

  const mainMarginClass = pageStep === 'agreement' ? 'mt-12' : '';
  return (
    <main
      className={`flex justify-center items-center ${mainMarginClass}`}
    >
      {pageStep === 'agreement' && (
        <Agreement handleSubmit={() => changePage('auth')} />
      )}
      {pageStep === 'auth' && (
        <Auth handleSubmit={() => changePage('signupForm')} />
      )}
      {pageStep === 'signupForm' && (
        <SignupForm handleSubmit={() => changePage('profile')} />
      )}
      {pageStep === 'profile' && (
        <ProfileSetup
          buttonText="가입하기"
          handleSubmit={() => changePage('welcome')}
        />
      )}
      {pageStep === 'welcome' && <Welcome />}
    </main>
  );
}
