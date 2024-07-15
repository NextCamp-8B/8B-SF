import { Locale } from '@/types/next-auth';
import { getTranslatedNews } from '@/utils/translate';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import React from 'react';

type NewsDetailLayoutProps = {
  children: React.ReactNode;
};

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const id = params.id;
  const locale = (await getLocale()) as Locale;
  const { news } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/news/${id}`)
  ).json();

  return {
    title: `${getTranslatedNews(news, locale, 'title')} | Eightnow`,
    description: getTranslatedNews(news, locale, 'summary'),
  };
}

export default function NewsDetailLayout({
  children,
}: NewsDetailLayoutProps) {
  return <>{children}</>;
}
