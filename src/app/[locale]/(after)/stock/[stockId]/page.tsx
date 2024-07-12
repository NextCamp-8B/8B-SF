import NewsHeading from '@/components/news/NewsHeading';
import NewsSection from '@/components/news/NewsSection';
import TodayPopularNews from '@/components/news/TodayPopularNews';
import SkeletonTodayPopularNews from '@/components/skeleton/news/SkeletonTodayPopularNews';
import ChartSection from '@/components/stock/detail/ChartSection';
import { Suspense } from 'react';

export default function StockDetail() {
  return (
    <div className="flex flex-col gap-5">
      <ChartSection />
      <NewsSection>
        <NewsHeading>오늘 인기있는 뉴스</NewsHeading>
        <Suspense fallback={<SkeletonTodayPopularNews />}>
          <TodayPopularNews />
        </Suspense>
      </NewsSection>
    </div>
  );
}
