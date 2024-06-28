'use client';
import { useState, useEffect } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Popup() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    // 10초 login 페이지로 이동
    // 5초부터 사용자에게 페이지 이동을 알림
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push('/login');
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);
  const handleBackgroundClick = () => {
    router.refresh();
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
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
            {timeLeft < 6 && (
              <p className="text-center caption">
                {timeLeft}초 후에 로그인 페이지로 이동합니다.
              </p>
            )}
          </p>
          <Link href="/login">
            <TextButton className="mt-4 w-[332px]">로그인</TextButton>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
}
