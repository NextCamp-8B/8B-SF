import React from 'react';
import Card from '../shared/Card';
import { News } from '@/types/news';
import Exclamation from '@/assets/icons/exclamation.svg';
import { getTranslations } from 'next-intl/server';

export default async function HomeRelatedNews() {
  const { newsList }: { newsList: News[] } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/news/related/stock`)
  ).json();
  const t = await getTranslations('News');
  return (
    <div className="flex gap-5">
      {newsList ? (
        <>
          {newsList.map((news) => (
            <Card type="News1" key={news.news_id} news={news} />
          ))}
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <Exclamation />
          <span className="b1 font-bold text-primary-900">
            {t('related_warning')}
          </span>
        </div>
      )}
    </div>
  );
}
