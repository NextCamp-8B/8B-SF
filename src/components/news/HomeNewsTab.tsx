import React, { Suspense } from 'react';
import NewsSection from './NewsSection';
import HomeRelatedNews from './HomeRelatedNews';
import HomeRecentNews from './HomeRecentNews';
import NewsHeading from './NewsHeading';
import ImportantNews from './ImportantNews';
import SkeletonImportantNews from '../skeleton/news/SkeletonImportantNews';
import SkeletonHomeRecentNews from '../skeleton/news/SkeletonHomeRecentNews';
import SkeletonHomeRelatedNews from '../skeleton/news/SkeletonHomeRelatedNews';
import { getTranslations } from 'next-intl/server';
import { auth as getSession } from '@/auth';
import { Session } from 'next-auth';

export default async function HomeNewsTab() {
  const t = await getTranslations('Home');
  const { user } = (await getSession()) as Session;
  return (
    <NewsSection>
      <NewsHeading>
        {t('stock_news_for_user', { nickname: user.nickname })}
      </NewsHeading>
      <div className="bg-grayscale-0 p-12 flex flex-col gap-12 rounded-2xl">
        <section>
          <NewsHeading size="medium">{t('interest')}</NewsHeading>
          <Suspense fallback={<SkeletonHomeRelatedNews />}>
            <HomeRelatedNews />
          </Suspense>
        </section>
        <section>
          <NewsHeading size="medium">
            {t('featured_news')}
          </NewsHeading>
          <Suspense fallback={<SkeletonImportantNews />}>
            <ImportantNews />
          </Suspense>
        </section>
        <section>
          <NewsHeading size="medium">{t('latest_news')}</NewsHeading>
          <Suspense fallback={<SkeletonHomeRecentNews />}>
            <HomeRecentNews />
          </Suspense>
        </section>
      </div>
    </NewsSection>
  );
}
