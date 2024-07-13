import React from 'react';

import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/types/next-auth';

type RelatedNewsToNewsProps = {
  id: string;
};

export default async function RelatedNewsToNews({
  id,
}: RelatedNewsToNewsProps) {
  const { newsList }: { newsList: News[] } = await (
    await fetch(
      `${process.env.NEXTAUTH_URL}/api/news/related/news/${id}`,
    )
  ).json();
  const locale = (await getLocale()) as Locale;
  return (
    <div>
      {newsList.map((news) => (
        <NewsListItem
          type="related"
          key={news.news_id}
          news={news}
          locale={locale}
        />
      ))}
    </div>
  );
}
