import React from 'react';

import Wrapper from '@/components/shared/Wrapper';
import RelatedNews from '@/components/news/RelatedNews';
import NewsDetail from '@/components/news/NewsDetail';
import RelatedStock from '@/components/news/RelatedStock';
import { TMP_NEWS } from '@/constants';

const tmpStock = {
  name: '애플',
  subname: 'AAPL',
  value: '00.00',
  tmp1: -0.82,
  tmp2: 1.75,
  id: '1',
  path: '',
};

export default function NewsDetailPage() {
  return (
    <>
      <main className="flex justify-center gap-5 max-w-[1200px]">
        <Wrapper padding="p-8" width="flex-1 flex flex-col gap-8">
          <NewsDetail />
        </Wrapper>
        {/* 오른쪽 */}
        <div className="flex flex-col gap-5">
          <Wrapper padding="p-8" width="w-96">
            <span className="b3 font-bold pb-[10px] text-primary-900">
              현재 뉴스와 관련된 주식
            </span>
            <RelatedStock
              stockList={[tmpStock, tmpStock, tmpStock]}
            />
          </Wrapper>
          <Wrapper padding="p-8" width="w-96">
            <span className="b3 font-bold pb-[10px] text-primary-900 inline-block">
              관련 기사
            </span>
            <RelatedNews
              related="news"
              newsList={[TMP_NEWS, TMP_NEWS, TMP_NEWS]}
            />
          </Wrapper>
        </div>
      </main>
    </>
  );
}
