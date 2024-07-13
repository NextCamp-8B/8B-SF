import React from 'react';
import NewsBorder from './NewsBorder';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/types/next-auth';

export default async function HomeRecentNews() {
  const limit = 3;
  const { newsList }: { newsList: News[] } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/news?limit=${limit}`)
  ).json();
  const locale = (await getLocale()) as Locale;
  return (
    <NewsBorder>
      <div></div>
      {newsList.map((news) => (
        <NewsListItem
          key={news.news_id}
          type="medium"
          news={news}
          locale={locale}
        />
      ))}
    </NewsBorder>
  );
}
