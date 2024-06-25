'use client';
import React from 'react';

import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';

export default function FindPwModal() {
  const handleLoginClick = () => {
    // next/navigation의 router 사용 시 모달 창이 그대로 있다
    // 새로고침을 위해서는  window.location.href 사용해야 함?
    // 모달을 닫고 로그인 페이지로 이동
    window.location.href = '/login';
  };
  return (
    <div className="fixed inset-0 z-50 bg-grayscale-900 bg-opacity-65 flex justify-center items-center h-[100%] w-[100%] ">
      <Wrapper padding="px-14 py-6" width="w-[396px]">
        <div className="flex flex-col gap-y-4 items-center">
          <h3 className="b2 font-bold text-primary-900">
            임시비밀번호가 발급되었습니다.
          </h3>
          <p className="text-center font-normal b4">
            이메일을 확인하여 임시 비밀번호로 <br />
            재로그인 후 비밀번호를 변경해주세요.
          </p>
          <TextButton
            className="mt-4 w-[332px]"
            onClick={handleLoginClick}
          >
            로그인
          </TextButton>
        </div>
      </Wrapper>
    </div>
  );
}
