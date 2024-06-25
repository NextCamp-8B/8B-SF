import NewsBorder from '@/components/news/NewsBorder';
import NewsHeading from '@/components/news/NewsHeading';
import NewsSection from '@/components/news/NewsSection';
import RecentNews from '@/components/news/RecentNews';
import RelatedNews from '@/components/news/RelatedNews';
import TodayPopularNews from '@/components/news/TodayPopularNews';
import Card from '@/components/shared/Card';
import NewsListItem from '@/components/shared/NewsListItem';

const tmpNews = {
  thumbnail:
    'https://cdn.pixabay.com/photo/2024/06/06/13/25/black-tailed-skimmer-8812720_1280.jpg',
  title: `"산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨훨훨훨훨훨훨훨훨훨훨`,
  content: `윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스
                매장 가능성이 있다"고 발표하면서 석유주가 이틀째
                급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%)
                오른 2만3300원에 거래를 마쳤다. 한국석유는 전날에도
                상한가로 장을 마친 바 있다.이 외에도 한국ANKOR유전도
                상한가를 찍었고, 흥구석유(024060)는 18.40% 올랐다.윤석열
                대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서
                "포항 영일만 앞바다에 막대한 양의 석유와 가스가 매장돼
                있을 가능성이 높다는 물리탐사 결과가 나왔다"고
                밝혔다.매장량은 최대 140억 배럴 가능성이 예상되며
                천연가스는 29년, 석유는 4년 이상 사용할 양이라고
                설명했다.`,
  publishedTime: '6시간전',
  company: '문화일보',
  date: '2024-06-24T19:52:16.000Z',
  id: '1',
};

export default function News() {
  return (
    <main className="flex items-center justify-center w-full flex-col bg-background-100 gap-12">
      {/* 오늘 인기있는 뉴스 */}
      <NewsSection>
        <NewsHeading>오늘 인기있는 뉴스</NewsHeading>
        <TodayPopularNews newsList={[tmpNews, tmpNews, tmpNews]} />
      </NewsSection>
      {/* 관심종목과 관련된 뉴스 */}
      <NewsSection>
        <NewsHeading>관심종목과 관련된 뉴스</NewsHeading>
        <RelatedNews newsList={[tmpNews, tmpNews, tmpNews]} />
      </NewsSection>
      {/* 최신 뉴스 */}
      <NewsSection>
        <NewsHeading>최신 뉴스</NewsHeading>
        <RecentNews newsList={[tmpNews, tmpNews, tmpNews]} />
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
              <Card type="News1" news={tmpNews} />
              <Card type="News1" news={tmpNews} />
              <Card type="News1" news={tmpNews} />
            </div>
          </section>
          <section>
            <h3 className="b1 font-medium text-primary-900 pb-4">
              주요 뉴스
            </h3>
            <NewsBorder>
              <NewsListItem type="important" news={tmpNews} />
            </NewsBorder>
          </section>
          <section>
            <h3 className="b1 font-medium text-primary-900 pb-4">
              최신 뉴스
            </h3>
            <NewsBorder>
              <NewsListItem type="medium" news={tmpNews} />
              <NewsListItem type="medium" news={tmpNews} />
              <NewsListItem type="medium" news={tmpNews} />
            </NewsBorder>
          </section>
        </div>
      </NewsSection>
    </main>
  );
}
