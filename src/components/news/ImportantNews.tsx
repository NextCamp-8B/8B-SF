import React from 'react';
import NewsBorder from './NewsBorder';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/types/next-auth';
import { businessAPI } from '@/service/apiInstance';

export default async function ImportantNews() {
  const { news }: { news: News } =
    await businessAPI.getImportantNews();
  const locale = (await getLocale()) as Locale;
  return (
    <NewsBorder>
      <NewsListItem type="important" news={news} locale={locale} />
    </NewsBorder>
  );
}
