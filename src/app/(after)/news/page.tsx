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

      {/* home에 들어가야함 스팩님을 위한 주식 뉴스 */}
      <NewsSection>
        <h1 className="h4 font-bold pb-6 text-primary-900">
          스팩님을 위한 주식 뉴스
        </h1>
        <div className="bg-grayscale-0 p-12 flex flex-col gap-12 rounded-2xl">
          <section>
            <h3 className="b1 font-medium text-primary-900 pb-4">
              관심종목
            </h3>
            <div className="flex gap-5">
              <Card type="News1" news={TMP_NEWS} />
              <Card type="News1" news={TMP_NEWS} />
              <Card type="News1" news={TMP_NEWS} />
            </div>
          </section>
          <section>
            <h3 className="b1 font-medium text-primary-900 pb-4">
              주요 뉴스
            </h3>
            <NewsBorder>
              <NewsListItem type="important" news={TMP_NEWS} />
            </NewsBorder>
          </section>
          <section>
            <h3 className="b1 font-medium text-primary-900 pb-4">
              최신 뉴스
            </h3>
            <NewsBorder>
              <NewsListItem type="medium" news={TMP_NEWS} />
              <NewsListItem type="medium" news={TMP_NEWS} />
              <NewsListItem type="medium" news={TMP_NEWS} />
            </NewsBorder>
          </section>
        </div>
      </NewsSection>
    </main>
  );
}
