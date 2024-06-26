import NewsBorder from '@/components/news/NewsBorder';
import NewsHeading from '@/components/news/NewsHeading';
import NewsSection from '@/components/news/NewsSection';
import RecentNews from '@/components/news/RecentNews';
import RelatedNews from '@/components/news/RelatedNews';
import TodayPopularNews from '@/components/news/TodayPopularNews';
import Card from '@/components/shared/Card';
import NewsListItem from '@/components/shared/NewsListItem';
import { TMP_NEWS } from '@/constants';

export default function News() {
  return (
    <main className="flex items-center justify-center w-full flex-col gap-12">
      {/* 오늘 인기있는 뉴스 */}
      <NewsSection>
        <NewsHeading>오늘 인기있는 뉴스</NewsHeading>
        <TodayPopularNews newsList={[TMP_NEWS, TMP_NEWS, TMP_NEWS]} />
      </NewsSection>
      {/* 관심종목과 관련된 뉴스 */}
      <NewsSection>
        <NewsHeading>관심종목과 관련된 뉴스</NewsHeading>
        <RelatedNews newsList={[TMP_NEWS, TMP_NEWS, TMP_NEWS]} />
      </NewsSection>
      {/* 최신 뉴스 */}
      <NewsSection>
        <NewsHeading>최신 뉴스</NewsHeading>
        <RecentNews newsList={[TMP_NEWS, TMP_NEWS, TMP_NEWS]} />
      </NewsSection>
    </main>
  );
}
