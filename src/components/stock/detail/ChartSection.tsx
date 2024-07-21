'use client';

import Chart from '@/components/shared/chart';
import AddInterest from './AddInterest';
import Wrapper from '@/components/shared/Wrapper';
import StockIcon from '@/components/shared/StockIcon';
import StockDescription from '../StockDescription';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { businessAPI } from '@/service/apiInstance';
import { useSession } from 'next-auth/react';
import { UUID } from 'crypto';
import { StockWithInterest, UserData } from '@/service/serviceType';
import { StockResponse } from './type';

export default function ChartSection({ stockId }: { stockId: UUID }) {
  const [stock, setStock] = useState<StockWithInterest>({});
  const [pay, setPay] = useState<StockResponse | []>([]);
  const intervalRef = useRef<number | NodeJS.Timeout | null>(null);
  const t = useTranslations();
  const user = useSession()?.data?.user as UserData;
  const { language, id: userId } = user || { language: '', id: '' };
  const { getStockDetail, getNaverpay, updateStock } = businessAPI;

  const fetchNaverpay = async (stockCode: string) => {
    const response = await getNaverpay({ companies: stockCode });
    const {
      fluctuationsRatio,
      compareToPreviousClosePrice,
      closePrice,
    } = response?.datas[0];
    setPay(response);

    const isNeeded =
      stockId &&
      fluctuationsRatio &&
      compareToPreviousClosePrice &&
      closePrice;

    if (!isNeeded) return;

    const isDifferent =
      stock?.fluctuations_ratio !== Number(fluctuationsRatio) &&
      stock?.compare_to_previous_close_price !==
        Number(compareToPreviousClosePrice) &&
      stock?.price !== Number(closePrice);

    if (isDifferent) {
      await updateStock({
        stockId,
        fluctuationsRatio,
        compareToPreviousClosePrice,
        closePrice,
      });
    }
  };

  const handleGetStock = async () => {
    const detail = await getStockDetail({
      userId: userId as UUID,
      stockId,
    });
    const data = detail[0];
    setStock(data);
    const { stock_code: stockCode } = data;

    if (stockCode) {
      fetchNaverpay(stockCode);
    }
  };

  useEffect(() => {
    if (userId && stockId) {
      handleGetStock();
    }
  }, [userId, stockId]);

  const { stock_code: stockCode } = stock && stock;
  useEffect(() => {
    const { pollingInterval } = pay as StockResponse;

    if (pay && 'pollingInterval' in pay) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (stock.stock_code) {
          fetchNaverpay(stock.stock_code);
        }
      }, pollingInterval || 70000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [pay, stockCode]);

  const handleIsInterest = (isInterest: boolean) => {
    setStock((prev: StockWithInterest) => ({
      ...prev,
      isInterest: isInterest,
    }));
  };
  const stockExchangeName = (pay as StockResponse).datas?.[0]
    ?.stockExchangeType?.name;

  return (
    <>
      <AddInterest
        stock={stock}
        userId={userId as UUID}
        handleIsInterest={handleIsInterest}
      />
      <div className="flex justify-between">
        <Wrapper width="w-[488px]" padding="p-8">
          <StockDescription stock={stock} language={language} />
        </Wrapper>
        <Chart width="min-w-[692px]">
          <Chart.StockChartCard
            as="h3"
            stockCode={stockCode}
            name={stockExchangeName}
          />
        </Chart>
      </div>
      <div className="flex justify-between box-border">
        <Chart>
          <Chart.StockAIReportCard as="h3" />
        </Chart>
        <Wrapper width="w-[750px]" padding="p-8">
          <h3 className="b1 font-bold text-primary-900 mb-[55px]">
            {t('Stock.ai_analyst_report')}
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
