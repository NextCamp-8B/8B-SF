import React from 'react';
import Card from '../shared/Card';
import { News } from '@/types/news';
import Exclamation from '@/assets/icons/exclamation.svg';
import { getTranslations } from 'next-intl/server';
import { businessAPI } from '@/service/apiInstance';
import { Session } from 'next-auth';
import { auth as getSession } from '@/auth';
import { UUID } from 'crypto';

export default async function RelatedNewsToStock() {
  const { user } = (await getSession()) as Session;
  const { newsList }: { newsList: News[] } =
    await businessAPI.getRelatedNewsToInterestStock({
      userId: user.id as UUID,
    });
  const t = await getTranslations('News');
  return (
    <div className="flex gap-5">
      {newsList.length > 0 ? (
        newsList.map((news) => (
          <Card key={news.news_id} type="News2" news={news} />
        ))
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
