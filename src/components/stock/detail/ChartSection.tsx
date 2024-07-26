'use client';

import Chart from '@/components/shared/chart';
import AddInterest from './AddInterest';
import Wrapper from '@/components/shared/Wrapper';
import StockDescription from '../StockDescription';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { businessAPI } from '@/service/apiInstance';
import { useSession } from 'next-auth/react';
import { UUID } from 'crypto';
import { StockWithInterest, UserData } from '@/service/serviceType';
import { StockResponse } from './type';
import StockListItem from '@/components/shared/StockListItem';

export default function ChartSection({ stockId }: { stockId: UUID }) {
  const [stock, setStock] = useState<StockWithInterest>({
    stock_id: '',
    stock_name: '',
    stock_code: '',
    compare_to_previous_close_price: 0,
    fluctuations_ratio: 0,
    logo_path: '',
    price: 0,
    isInterest: false,
    report: '',
  });
  const [aIReport, setAIReport] = useState({
    report: '',
    detailedData: '',
  });
  const [pay, setPay] = useState<StockResponse | []>([]);
  const intervalRef = useRef<number | NodeJS.Timeout | null>(null);
  const t = useTranslations();
  const user = useSession()?.data?.user as UserData;
  const { language, id: userId } = user || { language: '', id: '' };
  const {
    getStockDetail,
    getNaverpay,
    updateStock,
    generateAIReport,
    updateViewCount,
    updateRecentView,
  } = businessAPI;

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

  useEffect(() => {
    if (userId && stockCode) {
      generateAIReport({
        userId: userId as UUID,
        stockSymbol: stockCode,
      }).then((res) =>
        setAIReport({
          report: res?.updatedReport[0]?.report,
          detailedData: res?.updatedReport[0]?.detailedData,
        }),
      );
    }
  }, [userId, stockCode]);

  useEffect(() => {
    if (stockId) {
      updateViewCount({ stockId });
      updateRecentView({ stockId });
    }
  }, [stockId]);

  const report = aIReport?.report ? aIReport?.report : stock?.report;

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
          <Chart.StockAIReportCard as="h3" stockId={stockId} />
        </Chart>
        <Wrapper width="w-[750px]" padding="p-8">
          <h3 className="b1 font-bold text-primary-900 mb-[55px]">
            {t('Stock.ai_analyst_report')}
          </h3>

          <StockListItem stock={stock} type="report" />
          <div className="overflow-y-scroll h-[96px] pt-4">
            <p className="b4 font-medium text-[#000000]">{report}</p>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
