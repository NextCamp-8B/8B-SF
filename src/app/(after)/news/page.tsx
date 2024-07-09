import NewsHeading from '@/components/news/NewsHeading';
import NewsSection from '@/components/news/NewsSection';
import RelatedNewsToStock from '@/components/news/RelatedNewsToStock';
import TodayPopularNews from '@/components/news/TodayPopularNews';
import SkeletonRecentNews from '@/components/skeleton/news/SkeletonRecentNews';
import SkeletonRelatedNewsToStock from '@/components/skeleton/news/SkeletonRelatedNewsToStock';
import SkeletonTodayPopularNews from '@/components/skeleton/news/SkeletonTodayPopularNews';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RecentNews = dynamic(
  () => import('@/components/news/RecentNews'),
  {
    ssr: false,
    loading: () => <SkeletonRecentNews />,
  },
);

export default function News() {
  return (
    <main className="flex items-center justify-center flex-col gap-12">
      {/* 오늘 인기있는 뉴스 */}
      <NewsSection>
        <NewsHeading>오늘 인기있는 뉴스</NewsHeading>
        <Suspense fallback={<SkeletonTodayPopularNews />}>
          <TodayPopularNews />
        </Suspense>
      </NewsSection>
      {/* 관심종목과 관련된 뉴스 */}
      <NewsSection>
        <NewsHeading>관심종목과 관련된 뉴스</NewsHeading>
        <Suspense fallback={<SkeletonRelatedNewsToStock />}>
          <RelatedNewsToStock />
        </Suspense>
      </NewsSection>
      {/* 최신 뉴스 */}
      <NewsSection>
        <NewsHeading>최신 뉴스</NewsHeading>
        <RecentNews />
      </NewsSection>
    </main>
  );
}
