import React, { Suspense } from 'react';
import NewsSection from './NewsSection';
import HomeRelatedNews from './HomeRelatedNews';
import HomeRecentNews from './HomeRecentNews';
import NewsHeading from './NewsHeading';
import ImportantNews from './ImportantNews';
import SkeletonImportantNews from '../skeleton/news/SkeletonImportantNews';
import SkeletonHomeRecentNews from '../skeleton/news/SkeletonHomeRecentNews';
import SkeletonHomeRelatedNews from '../skeleton/news/SkeletonHomeRelatedNews';

export default function HomeNewsTab() {
  return (
    <NewsSection>
      <NewsHeading>스팩님을 위한 주식 뉴스</NewsHeading>
      <div className="bg-grayscale-0 p-12 flex flex-col gap-12 rounded-2xl">
        <section>
          <NewsHeading size="medium">관심종목</NewsHeading>
          <Suspense fallback={<SkeletonHomeRelatedNews />}>
            <HomeRelatedNews />
          </Suspense>
        </section>
        <section>
          <NewsHeading size="medium">주요 뉴스</NewsHeading>
          <Suspense fallback={<SkeletonImportantNews />}>
            <ImportantNews />
          </Suspense>
        </section>
        <section>
          <NewsHeading size="medium">최신 뉴스</NewsHeading>
          <Suspense fallback={<SkeletonHomeRecentNews />}>
            <HomeRecentNews />
          </Suspense>
        </section>
      </div>
    </NewsSection>
  );
}
