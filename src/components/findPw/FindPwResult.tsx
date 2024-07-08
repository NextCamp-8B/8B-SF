'use client';

import React from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import { useRouter } from 'next/navigation';

export default function FindPwResult() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); // 로그인 페이지로 이동
  };

  return (
    <Wrapper padding="px-24 py-20" width="w-[590px] h-min">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          비밀번호 변경 성공
        </h3>
        <p className="text-center font-normal b2 gap-y-2">
          비밀번호가 변경되었습니다. <br />
          로그인 하여 확인해주세요!
        </p>
      </div>
      <TextButton className="mt-12" onClick={handleLoginClick}>
        로그인하기
      </TextButton>
    </Wrapper>
  );
}
