import Wrapper from '@/components/shared/Wrapper';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Link from 'next/link';
import React from 'react';
import Exclamation from '@/assets/icons/exclamation.svg';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-background-100">
      <Wrapper
        width="w-[609px] flex flex-col items-center"
        padding="p-[82px]"
      >
        <Exclamation className="w-16 h-16" />
        <div className="text-center text-primary-900 pb-9 pt-6">
          <h1 className="h4 font-bold pb-4">
            {t('not_found_title')}
          </h1>
          <span className="b3 font-medium">
            {t('not_found_content')}
          </span>
        </div>
        <Link href="/home">
          <ButtonBase className="w-[386px] h-16 bg-primary-900 text-grayscale-0 rounded-lg">
            {t('go_to_home')}
          </ButtonBase>
        </Link>
      </Wrapper>
    </main>
  );
}
