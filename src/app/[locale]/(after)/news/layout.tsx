import { getTranslations } from 'next-intl/server';
import React from 'react';

type NewsLayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: t('news'),
    description: 'Provide news related to US stocks.',
  };
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return <>{children}</>;
}
