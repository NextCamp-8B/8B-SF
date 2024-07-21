import React from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Welcome() {
  const t = useTranslations();

  return (
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          {t('SignUp.sign_up_title')}
        </h3>
        <p className="text-center font-normal b2 whitespace-pre-line">
          {t('SignUp.sign_up_content')}
        </p>
      </div>
      <Link href="/login">
        <TextButton className="mt-12">
          {t('SignUp.go_to_login')}
        </TextButton>
      </Link>
    </Wrapper>
  );
}
