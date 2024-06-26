import Wrapper from '@/components/shared/Wrapper';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Link from 'next/link';
import React from 'react';
import Exclamation from '@/assets/icons/exclamation.svg';

export default function NotFound() {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-background-100">
      <Wrapper
        width="w-[609px] flex flex-col items-center"
        padding="p-[82px]"
      >
        <Exclamation className="w-16 h-16" />
        <div className="text-center text-primary-900 pb-9 pt-6">
          <h1 className="h4 font-bold pb-4">
            요청하신 페이지를 찾을 수 없습니다
          </h1>
          <span className="b3 font-medium">
            페이지의 주소가 잘못 입력되었거나
            <br />
            주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
            없습니다.
          </span>
        </div>
        <Link href="/home">
          <ButtonBase className="w-[386px] h-16 bg-primary-900 text-grayscale-0 rounded-lg">
            메인으로
          </ButtonBase>
        </Link>
      </Wrapper>
    </main>
  );
}
