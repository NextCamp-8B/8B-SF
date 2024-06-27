'use client';
import { useState, useEffect } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import TextButton from '@/components/shared/buttons/TextButton';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FindPw() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isModalOpen = searchParams.get('modal') === 'true';
  // 사용자가 직접 modal 경로로 들어왔을 때
  // 원래 페이지로 라우트 시키기
  // 경로에 modal=true 값이 없다면 라우트 처리
  useEffect(() => {
    if (!isModalOpen) {
      router.push('/find/pw');
    }
  }, [isModalOpen, router]);
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col items-center w-96 h-full ">
            <h3 className="h3 font-bold text-center mb-10">
              비밀번호 찾기
            </h3>
            {/* 이름 / 아이디 / 이메일 입력 폼 */}
            <InputSet className="flex flex-col gap-4">
              <InputSet.Validated
                onChange={() => {}}
                value={''}
                type="text"
                isSubmit={false}
                concept="name"
              />
              <InputSet.Validated
                onChange={() => {}}
                value={''}
                isSubmit={false}
                type="text"
                concept="loginId"
              />
              <InputSet.Validated
                onChange={() => {}}
                value={''}
                isSubmit={false}
                type="email"
                concept="email"
              />
              {/* submit 비밀번호 찾기 버튼 */}
              <TextButton className="mt-8" disabled={true}>
                임시비밀번호 발급
              </TextButton>
            </InputSet>
          </div>
        </Wrapper>
      </main>
    </>
  );
}
