import React, { Suspense } from 'react';

import Wrapper from '@/components/shared/Wrapper';
import NewsDetail from '@/components/news/NewsDetail';
import RelatedStock from '@/components/news/RelatedStock';
import RelatedNewsToNews from '@/components/news/RelatedNewsToNews';
import SkeletonNewsDetail from '@/components/skeleton/news/SkeletonNewsDetail';
import SkeletonRelatedNewsToNews from '@/components/skeleton/news/SkeletonRelatedNewsToNews';
import SkeletonRelatedStock from '@/components/skeleton/news/SkeletonRelatedStock';
import { getTranslations } from 'next-intl/server';
import IntlClientProvider from '@/components/shared/IntlClientProvider';

type NewsDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  await (
    await fetch(`http://localhost:3000/api/news/${params.id}`, {
      method: 'PATCH',
    })
  ).json();

  const t = await getTranslations('NewsDetail');
  return (
    <>
      <main className="flex justify-center gap-5 max-w-[1200px]">
        <Wrapper
          padding="p-8"
          width="flex-1 flex flex-col gap-8 h-fit"
        >
          <Suspense fallback={<SkeletonNewsDetail />}>
            <IntlClientProvider>
              <NewsDetail id={params.id} />
            </IntlClientProvider>
          </Suspense>
        </Wrapper>
        {/* 오른쪽 */}
        <div className="flex flex-col gap-5">
          <Wrapper padding="p-8" width="w-96">
            <span className="b3 font-bold pb-[10px] text-primary-900">
              {t('stock_related_news')}
            </span>
            <Suspense fallback={<SkeletonRelatedStock />}>
              <RelatedStock id={params.id} />
            </Suspense>
          </Wrapper>
          <Wrapper padding="p-8" width="w-96">
            <span className="b3 font-bold pb-[10px] text-primary-900 inline-block">
              {t('related_news')}
            </span>
            <Suspense fallback={<SkeletonRelatedNewsToNews />}>
              <RelatedNewsToNews id={params.id} />
            </Suspense>
          </Wrapper>
        </div>
      </main>
    </>
  );
}
