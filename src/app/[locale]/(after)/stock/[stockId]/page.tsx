import NewsHeading from '@/components/news/NewsHeading';
import NewsSection from '@/components/news/NewsSection';
import TodayPopularNews from '@/components/news/TodayPopularNews';
import IntlClientProvider from '@/components/shared/IntlClientProvider';
import SkeletonTodayPopularNews from '@/components/skeleton/news/SkeletonTodayPopularNews';
import ChartSection from '@/components/stock/detail/ChartSection';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export default async function StockDetail() {
  const t = await getTranslations('Stock');

  return (
    <div className="flex flex-col gap-5">
      <IntlClientProvider>
        <ChartSection />
      </IntlClientProvider>
      <NewsSection>
        <NewsHeading>{t('popular_news_today')}</NewsHeading>
        <Suspense fallback={<SkeletonTodayPopularNews />}>
          <TodayPopularNews />
        </Suspense>
      </NewsSection>
    </div>
  );
}
