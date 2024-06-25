import React from 'react';
import BackGround from '@/assets/landing/background.png';
import Image from 'next/image';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Mockup from '@/assets/landing/mockup.png';
import Link from 'next/link';

export default function Landing() {
  return (
    <main className="flex flex-col items-center justify-end h-screen">
      <Image
        src={BackGround}
        fill
        alt="background"
        className="-z-10"
      />
      <div className="text-grayscale-0 flex flex-col items-center pb-14 pt-14">
        <h1 className="h1 font-medium pb-6">
          해외주식은 <span className="font-bold">아잇나우</span>와
          함께!
        </h1>
        <div className="text-center h4 font-medium pb-14">
          <span className="block">해외 주식 뉴스 실시간 번역과</span>
          <span className="block">
            AI 애널리스트가 알려주는 어려운 해외주식 리포트
          </span>
        </div>
        <ButtonBase className="bg-primary-800 w-[386px] h-16 rounded-lg">
          <Link href="/login" className="b3 font-medium">
            로그인
          </Link>
        </ButtonBase>
      </div>
      <Image src={Mockup} width="1038" alt="device" />
    </main>
  );
}
