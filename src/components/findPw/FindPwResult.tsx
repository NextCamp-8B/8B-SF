'use client';

import React from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function FindPwResult() {
  const t = useTranslations();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); // 로그인 페이지로 이동
  };

  return (
    <Wrapper padding="px-24 py-20" width="w-[590px] h-min">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900 whitespace-nowrap">
          {t('UpdatedPw.reset_password_success_title')}
        </h3>
        <p className="text-center font-normal b2 gap-y-2 whitespace-pre-line">
          {t('UpdatedPw.reset_password_success_content')}
        </p>
      </div>
      <TextButton className="mt-12" onClick={handleLoginClick}>
        {t('UpdatedPw.login_button')}
      </TextButton>
    </Wrapper>
  );
}
