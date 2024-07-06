import Wrapper from '@/components/shared/Wrapper';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Link from 'next/link';
import React from 'react';
import Exclamation from '@/assets/icons/exclamation.svg';

export default function AuthEror() {
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
            다시 시도하시거나, 고객센터에 문의해주세요.
          </span>
        </div>
        <Link href="/login">
          <ButtonBase className="w-[386px] h-16 bg-primary-900 text-grayscale-0 rounded-lg">
            로그인 페이지로
          </ButtonBase>
        </Link>
      </Wrapper>
    </main>
  );
}
