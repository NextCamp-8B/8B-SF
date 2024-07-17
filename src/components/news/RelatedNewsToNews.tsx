import React from 'react';

import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';
import { getLocale, getTranslations } from 'next-intl/server';
import { Locale } from '@/types/next-auth';
import { diffCreatedTime } from '@/utils/date';

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
  const t = await getTranslations('Date');
  return (
    <div>
      {newsList.map((news) => (
        <NewsListItem
          type="related"
          key={news.news_id}
          news={{
            ...news,
            published_at: t(
              diffCreatedTime(news.published_at).periodType,
              { period: diffCreatedTime(news.published_at).period },
            ),
          }}
          locale={locale}
        />
      ))}
    </div>
  );
}
