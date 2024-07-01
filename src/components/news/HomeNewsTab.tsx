import React from 'react';
import NewsSection from './NewsSection';
import HomeRelatedNews from './HomeRelatedNews';
import HomeRecentNews from './HomeRecentNews';
import NewsHeading from './NewsHeading';
import ImportantNews from './ImportantNews';

export default function HomeNewsTab() {
  return (
    <NewsSection>
      <NewsHeading>스팩님을 위한 주식 뉴스</NewsHeading>
      <div className="bg-grayscale-0 p-12 flex flex-col gap-12 rounded-2xl">
        <section>
          <NewsHeading size="medium">관심종목</NewsHeading>
          <HomeRelatedNews />
        </section>
        <section>
          <NewsHeading size="medium">주요 뉴스</NewsHeading>
          <ImportantNews />
        </section>
        <section>
          <NewsHeading size="medium">최신 뉴스</NewsHeading>
          <HomeRecentNews />
        </section>
      </div>
    </NewsSection>
  );
}
