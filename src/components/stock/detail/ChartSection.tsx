'use client';

import Chart from '@/components/shared/chart';
import AddInterest from './AddInterest';
import Wrapper from '@/components/shared/Wrapper';
import StockIcon from '@/components/shared/StockIcon';
import StockDescription from '../StockDescription';
import { useTranslations } from 'next-intl';

export default function ChartSection() {
  const t = useTranslations();

  return (
    <>
      <AddInterest />
      <div className="flex justify-between">
        <Wrapper width="w-[488px]" padding="p-8">
          <StockDescription />
        </Wrapper>
        <Chart width="min-w-[692px]">
          <Chart.StockChartCard as="h3" />
        </Chart>
      </div>
      <div className="flex justify-between box-border">
        <Chart>
          <Chart.StockAIReportCard as="h3" />
        </Chart>
        <Wrapper width="w-[750px]" padding="p-8">
          <h3 className="b1 font-bold text-primary-900 mb-[55px]">
            {t('ai_analyst_report')}
          </h3>

          {/* 임시 구현 - Icon 컴포넌트 담당 한승재 (stat1202) */}
          <div className="flex items-center gap-2 mb-4">
            <StockIcon
              path={
                'https://zlxqxgiycccjxcwzonsx.supabase.co/storage/v1/object/public/8b-sf/stock_logo/apple_logo.svg'
              }
              size="small"
            />
            <div className="flex gap-2 items-center b2 font-medium">
              <h2 className="b3 font-medium text-grayscale-900">
                애플
              </h2>
              <span>∙</span>
              <span className="b3 font-normal text-grayscale-900">
                AAPL
              </span>
              <span className="b4 font-medium text-grayscale-900">
                $00.00
              </span>
              <span className="b4 font-normal text-warning-100">
                ▲1.75 +0.82%
              </span>
            </div>
          </div>
          <p className="b4 font-medium text-[#000000]">
            {t('Stock.stock_report')}
          </p>
        </Wrapper>
      </div>
    </>
  );
}
