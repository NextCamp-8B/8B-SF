import React from 'react';

import Wrapper from '@/components/shared/Wrapper';
import NewsDetail from '@/components/news/NewsDetail';
import RelatedStock from '@/components/news/RelatedStock';
import RelatedNewsToNews from '@/components/news/RelatedNewsToNews';

const tmpStock = {
  name: '애플',
  subname: 'AAPL',
  value: '00.00',
  tmp1: -0.82,
  tmp2: 1.75,
  id: '1',
  path: '',
};

type NewsDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const data = await (
    await fetch(`http://localhost:3000/api/news/${params.id}`, {
      method: 'PATCH',
    })
  ).json();
  // console.log(data);

  return (
    <>
      <main className="flex justify-center gap-5 max-w-[1200px]">
        <Wrapper padding="p-8" width="flex-1 flex flex-col gap-8">
          <NewsDetail id={params.id} />
        </Wrapper>
        {/* 오른쪽 */}
        <div className="flex flex-col gap-5">
          <Wrapper padding="p-8" width="w-96">
            <span className="b3 font-bold pb-[10px] text-primary-900">
              현재 뉴스와 관련된 주식
            </span>
            <RelatedStock id={params.id} />
          </Wrapper>
          <Wrapper padding="p-8" width="w-96">
            <span className="b3 font-bold pb-[10px] text-primary-900 inline-block">
              관련 기사
            </span>
            <RelatedNewsToNews id={params.id} />
          </Wrapper>
        </div>
      </main>
    </>
  );
}
