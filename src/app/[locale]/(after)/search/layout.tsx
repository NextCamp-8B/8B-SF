import { getTranslations } from 'next-intl/server';
import React from 'react';

type SearchLayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: t('search'),
    description: 'Find the stocks you want.',
  };
}

export default function SearchLayout({
  children,
}: SearchLayoutProps) {
  return <>{children}</>;
}
