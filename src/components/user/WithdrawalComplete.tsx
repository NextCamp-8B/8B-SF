import React from 'react';
import Link from 'next/link';
import Wrapper from '../shared/Wrapper';
import TextButton from '../shared/buttons/TextButton';
import { getTranslations } from 'next-intl/server';

export default async function WithdrawalComplete() {
  const t = await getTranslations('WithdrawalComplete');

  return (
    <>
      <main className="mt-20">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col gap-y-4 items-center">
            <h3 className="h3 font-bold text-center text-primary-900 mb-8">
              {t('title')}
            </h3>
            <p className="text-center font-medium b3 whitespace-pre-line">
              {t('message')}
            </p>
            <Link href="/login">
              <TextButton className="mt-4 w-[332px]">
                {t('login_button')}
              </TextButton>
            </Link>
          </div>
        </Wrapper>
      </main>
    </>
  );
}
