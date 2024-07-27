import { businessAPI } from '@/service/apiInstance';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';

type ChartData = {
  growth: { score: number; trend: false };
  interestLevel: { score: number; trend: false };
  investmentIndex: { score: number; trend: false };
  profitability: { score: number; trend: false };
  stockPrice: { score: number; trend: false };
};

type ChartBaseItem = { score: string; trend: false };

export function useGetChartData(stockId: UUID) {
  const { getChartData } = businessAPI;
  const [chartData, setChartData] = useState<ChartData>({
    growth: { score: 0, trend: false },
    interestLevel: { score: 0, trend: false },
    investmentIndex: { score: 0, trend: false },
    profitability: { score: 0, trend: false },
    stockPrice: { score: 0, trend: false },
  });
  useEffect(() => {
    if (stockId) {
      getChartData({ stockId }).then((res: any) => {
        if (res?.analysisResult) {
          const processedData: Partial<ChartData> = {};
          for (const [key, value] of Object.entries(
            res.analysisResult,
          )) {
            processedData[key as keyof ChartData] = {
              score: Number((value as ChartBaseItem).score),
              trend: (value as ChartBaseItem).trend || false,
            };
          }

          setChartData({
            growth: processedData.growth || {
              score: 0,
              trend: false,
            },
            interestLevel: processedData.interestLevel || {
              score: 0,
              trend: false,
            },
            investmentIndex: processedData.investmentIndex || {
              score: 0,
              trend: false,
            },
            profitability: processedData.profitability || {
              score: 0,
              trend: false,
            },
            stockPrice: processedData.stockPrice || {
              score: 0,
              trend: false,
            },
          });
        }
      });
    }
  }, [stockId]);

  return chartData;
}
