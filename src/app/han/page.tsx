import NewsListItem from '@/components/shared/NewsListItem';
import React from 'react';
import AI from '@/assets/icons/ai.svg';
import StockListItem from '@/components/shared/StockListItem';

const tmpNews = {
  thumbnail:
    'https://cdn.pixabay.com/photo/2024/06/06/13/25/black-tailed-skimmer-8812720_1280.jpg',
  title: `"산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨`,
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
};

const tmpStock = {
  name: '애플',
  subname: 'AAPL',
  value: '00.00',
  tmp1: -0.82,
  tmp2: 1.75,
};

export default function Han() {
  return (
    <>
      <div className="flex flex-col gap-3 p-10">
        <NewsListItem news={tmpNews} />
        <NewsListItem news={tmpNews} />
        <NewsListItem news={tmpNews} />
      </div>
      <div className="flex flex-col gap-8 p-10">
        <NewsListItem size="large" news={tmpNews} />
        <NewsListItem size="large" news={tmpNews} />
        <NewsListItem size="large" news={tmpNews} />
      </div>
      <div className="flex flex-col gap-3 p-10">
        <NewsListItem size="small" news={tmpNews} />
        <NewsListItem size="small" news={tmpNews} />
        <NewsListItem size="small" news={tmpNews} />
      </div>
      <div className="flex flex-col gap-3 p-10">
        <StockListItem
          stock={tmpStock}
          icon={<AI className="w-12 h-12 text-grayscale-0" />}
        />
      </div>
      <div className="flex flex-col gap-3 p-10">
        <StockListItem
          stock={tmpStock}
          icon={
            <AI className="w-9 h-9 text-grayscale-0" type="find" />
          }
          type="find"
        />
      </div>
    </>
  );
}
