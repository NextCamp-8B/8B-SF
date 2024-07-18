'use client';
import Wrapper from '@/components/shared/Wrapper';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Exclamation from '@/assets/icons/exclamation.svg';
import { useSearchParams } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AuthEror() {
  const [isClient, setIsClient] = useState(false); //hydration error 해결방법

  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  const getErrorMessage = async (error: string | null) => {
    switch (error) {
      case 'AccessDenied':
        return '해당 이메일은 사용 중이거나 탈퇴한 유저의 이메일 입니다.';
      case 'SessionExpired':
        return '세션이 만료되었습니다. 다시 로그인 해주세요.';
      default:
        return '다시 시도하시거나, 고객센터에 문의해주세요.';
    }
  };

  const handleSignOut = async () => {
    if (error === 'SessionExpired') {
      await signOut({ redirect: false });
    }
  };

  if (!isClient) {
    return null; // 클라이언트 사이드에서만 렌더링하기 위해 초기 렌더링 시 빈 UI 반환
  }

  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-background-100">
      <Wrapper
        width="w-[609px] flex flex-col items-center"
        padding="p-[82px]"
      >
        <Exclamation className="w-16 h-16" />
        <div className="text-center text-primary-900 pb-9 pt-6">
          <h1 className="h4 font-bold pb-4">
            로그인 오류가 발생했습니다.
          </h1>
          <span className="b3 font-medium">
            {getErrorMessage(error)}
          </span>
        </div>
        <Link href="/login">
          <ButtonBase
            onClick={handleSignOut}
            className="w-[386px] h-16 bg-primary-900 text-grayscale-0 rounded-lg"
          >
            로그인 페이지로
          </ButtonBase>
        </Link>
      </Wrapper>
    </main>
  );
}
