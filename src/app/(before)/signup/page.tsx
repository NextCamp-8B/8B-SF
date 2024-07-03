'use client';
import React, { useState } from 'react';
import Agreement from '@/components/signup/Agreement';
import Auth from '@/components/signup/Auth';
import SignupForm from '@/components/signup/SignupForm';
import ProfileSetup from '@/components/signup/ProfileSetup';
import Welcome from '@/components/signup/Welcome';

// 페이지 스텝 타입 정의
export type PageStep =
  | 'agreement'
  | 'auth'
  | 'signupForm'
  | 'profile'
  | 'welcome';

export default function Signup() {
  const [pageStep, setPageStep] = useState<PageStep>('agreement');

  const changePage = (nextPage: PageStep) => {
    setPageStep(nextPage);
  };

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
