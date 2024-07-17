import React from 'react';
import NewsBorder from './NewsBorder';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';
import { getLocale, getTranslations } from 'next-intl/server';
import { Locale } from '@/types/next-auth';
import { businessAPI } from '@/service/apiInstance';
import { diffCreatedTime } from '@/utils/date';

export default async function HomeRecentNews() {
  const limit = 3;
  const { newsList }: { newsList: News[] } =
    await businessAPI.getRecentNews({
      limit,
      page: 0,
      isServer: true,
    });

  const locale = (await getLocale()) as Locale;

  const t = await getTranslations('Date');
  return (
    <NewsBorder>
      <div></div>
      {newsList.map((news) => (
        <NewsListItem
          key={news.news_id}
          type="medium"
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
    </NewsBorder>
  );
}
