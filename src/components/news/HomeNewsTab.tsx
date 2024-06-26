import React from 'react';
import NewsSection from './NewsSection';
import HomeRelatedNews from './HomeRelatedNews';
import NewsBorder from './NewsBorder';
import HomeRecentNews from './HomeRecentNews';
import NewsListItem from '../shared/NewsListItem';
import { TMP_NEWS } from '@/constants';
import NewsHeading from './NewsHeading';

export default function HomeNewsTab() {
  return (
    <NewsSection>
      <NewsHeading>스팩님을 위한 주식 뉴스</NewsHeading>
      <div className="bg-grayscale-0 p-12 flex flex-col gap-12 rounded-2xl">
        <section>
          <NewsHeading size="medium">관심종목</NewsHeading>
          <HomeRelatedNews
            newsList={[TMP_NEWS, TMP_NEWS, TMP_NEWS]}
          />
        </section>
        <section>
          <NewsHeading size="medium">주요 뉴스</NewsHeading>
          <NewsBorder>
            <NewsListItem type="important" news={TMP_NEWS} />
          </NewsBorder>
        </section>
        <section>
          <NewsHeading size="medium">최신 뉴스</NewsHeading>
          <HomeRecentNews newsList={[TMP_NEWS, TMP_NEWS, TMP_NEWS]} />
        </section>
      </div>
    </NewsSection>
  );
}
