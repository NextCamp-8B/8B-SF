import SkeletonLimitStocks from '@/components/skeleton/stock/SkeletonLimitStocks';
import AllStocks from '@/components/stock/AllStocks';
import LimitStocks from '@/components/stock/LimitStocks';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export default async function Stock() {
  const t = await getTranslations('Stock');
  return (
    <>
      <main className="flex items-center justify-center w-full flex-col gap-12">
        <div className="w-[1200px] flex gap-5">
          <div className="flex flex-col w-full flex-1">
            <div className="h4 font-bold text-primary-900">
              {t('trending_stocks')}
            </div>
            <Suspense fallback={<SkeletonLimitStocks />}>
              <LimitStocks type="increase" />
            </Suspense>
          </div>
          <div className="flex flex-col flex-1">
            <div className="h4 font-bold text-primary-900">
              {t('pluging_stocks')}
            </div>
            <Suspense fallback={<SkeletonLimitStocks />}>
              <LimitStocks type="decrease" />
            </Suspense>
          </div>
        </div>
        <div className="w-[1200px] flex gap-5">
          <div className="flex flex-col w-full flex-1">
            <div className="h4 font-bold text-primary-900">
              {t('all')}
            </div>
            <AllStocks />
          </div>
        </div>
      </main>
    </>
  );
}
