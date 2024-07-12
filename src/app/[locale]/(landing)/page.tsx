import React from 'react';
import BackGround from '@/assets/landing/background.png';
import Image from 'next/image';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Mockup from '@/assets/landing/mockup.png';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Landing() {
  const t = await getTranslations('Landing');
  return (
    <main className="flex flex-col items-center justify-end h-screen">
      <Image
        src={BackGround}
        fill
        alt="background"
        className="-z-10"
      />
      <div className="text-grayscale-0 flex flex-col items-center pb-14 pt-14">
        <h1 className="h1 font-medium pb-6">{t('title')}</h1>
        <div className="text-center h4 font-medium pb-14">
          <span className="block">{t('text_1')}</span>
          <span className="block">{t('text_2')}</span>
        </div>
        <Link href="/login" className="b3 font-medium">
          <ButtonBase className="bg-primary-800 w-[386px] h-16 rounded-lg">
            {t('login')}
          </ButtonBase>
        </Link>
      </div>
      <Image src={Mockup} width="1038" alt="device" />
    </main>
  );
}
