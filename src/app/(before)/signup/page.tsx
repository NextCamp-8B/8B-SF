'use client';
import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import CheckBox from '@/components/shared/Checkbox';
import TextButton from '@/components/shared/buttons/TextButton';
import Agreement from '@/components/signup/Agreement';
import Auth from '@/components/signup/Auth';
import SignupForm from '@/components/signup/SignupForm';
import ProfileSetup from '@/components/signup/ProfileSetup';
import Welcome from '@/components/signup/Welcome';

// 페이지 스텝 타입 정의
type PageStep =
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
        <Agreement changePage={() => changePage('auth')} />
      )}
      {pageStep === 'auth' && (
        <Auth changePage={() => changePage('signupForm')} />
      )}
      {pageStep === 'signupForm' && (
        <SignupForm changePage={() => changePage('profile')} />
      )}
      {pageStep === 'profile' && (
        <ProfileSetup changePage={() => changePage('welcome')} />
      )}
      {pageStep === 'welcome' && <Welcome />}
    </main>
  );
}
