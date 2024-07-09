'use client';

import Chart from '@/components/shared/chart';
import AddInterest from './AddInterest';
import Wrapper from '@/components/shared/Wrapper';
import ToggleButton from '@/components/shared/ToggleButton';
import StockIcon from '@/components/shared/StockIcon';

export default function ChartSection() {
  return (
    <>
      <AddInterest />
      <div className="flex justify-between">
        <Wrapper width="w-[488px]" padding="p-8">
          {/* 임시 구현 - Icon 컴포넌트 담당 한승재 (stat1202) */}
          <div className="flex justify-between mb-8">
            <div>
              <div className="flex items-center gap-[2px]">
                <span className="b1 font-bold text-primary-900">
                  $00.00
                </span>
                <span className="b2 font-normal text-primary-900">
                  ∙
                </span>
                <span className="b2 font-normal text-primary-900">
                  AAPL
                </span>
              </div>
              <span className="b2 font-medium text-warning-100">
                ▲1.75 +0.82%
              </span>
            </div>
            <ToggleButton />
          </div>
          <p className="b4 font-normal text-grayscale-900">
            애플은 스마트폰, 개인용 컴퓨터, 태블릿, 웨어러블 및
            액세서리를 설계, 제조 및 판매하고 다양한 관련 서비스를
            판매한다. 제품 카테고리는 iPhone, MAc, iPad, Wearables,
            Home 및 Accessories로 나뉜다.
          </p>
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
            아잇나우 AI 애널리스트 리포트
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
            급격한 금리 인상에도 견조한 자동차 수요를 반영하여
            테슬라의 목표주가를 340달러로 26% 상향 조정하고 Top
            Pick으로 유지한다. 단기 상승에 따른 숨 고르기가
            예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다.
          </p>
        </Wrapper>
      </div>
    </>
  );
}
