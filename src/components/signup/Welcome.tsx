'use client';

import React from 'react';
import Wrapper from '@/components/shared/Wrapper';
import Link from 'next/link';
import TextButton from '@/components/shared/buttons/TextButton';

export default function Welcome() {
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
      <Link href="/login">
        <TextButton className="mt-12">로그인하기</TextButton>
      </Link>
    </Wrapper>
  );
}
