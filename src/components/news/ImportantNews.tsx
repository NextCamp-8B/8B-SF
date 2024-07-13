import React from 'react';
import NewsBorder from './NewsBorder';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/types/next-auth';

export default async function ImportantNews() {
  const { news }: { news: News } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/news/important`)
  ).json();
  const locale = (await getLocale()) as Locale;
  return (
    <NewsBorder>
      <NewsListItem type="important" news={news} locale={locale} />
    </NewsBorder>
  );
}
