'use client';
import React, { useEffect } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 사용자가 해당 모달창에서 10초간 동작이 없을시 login페이지로 이동
// 사용자가 바깥배경을 클릭 시 /find/pw로 다시 이동
// p/find/pw 의 page.tsx를 병렬/인터셉팅 라우트 처리하여 바깥배경으로 사용

export default function FindPwModal() {
  const router = useRouter();
  useEffect(() => {
    // 사용자가 해당 모달창에서 10초간 동작이 없을시
    // login 페이지로 이동
    const timer = setTimeout(() => {
      router.push('/login');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  // 사용자가 바깥배경을 클릭 시 /find/pw로 다시 이동
  // p/find/pw?modal=true  => find/pw 이동하여
  // 입력값은 자동으로 초기화
  const handleBackgroundClick = () => {
    router.push('/find/pw');
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-grayscale-900 bg-opacity-65 flex justify-center items-center h-[100%] w-[100%]"
        onClick={handleBackgroundClick}
      >
        <Wrapper padding="px-14 py-6" width="w-[396px]">
          <div
            className="flex flex-col gap-y-4 items-center"
            onClick={handleModalClick}
          >
            <h3 className="b2 font-bold text-primary-900">
              임시비밀번호가 발급되었습니다.
            </h3>
            <p className="text-center font-normal b4">
              이메일을 확인하여 임시 비밀번호로 <br />
              재로그인 후 비밀번호를 변경해주세요.
            </p>
            <Link href="/login">
              <TextButton className="mt-4 w-[332px]">
                로그인
              </TextButton>
            </Link>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
