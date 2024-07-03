'use client';

import React from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import { useRouter } from 'next/navigation';
import usePageStore from '@/store/signupStepStore';

export default function Welcome() {
  const { setPageStep } = usePageStore();
  const router = useRouter();

  const handleLoginClick = () => {
    setPageStep('agreement'); // 페이지 스텝 초기화
    router.push('/login'); // 로그인 페이지로 이동
  };

  return (
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          가입이 완료되었습니다.
        </h3>
        <p className="text-center font-normal b2">
          회원가입이 완료되었습니다. <br />
          로그인 후 이용해주세요!
        </p>
      </div>
      <TextButton className="mt-12" onClick={handleLoginClick}>
        로그인하기
      </TextButton>
    </Wrapper>
  );
}
