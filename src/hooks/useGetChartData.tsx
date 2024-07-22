import { businessAPI } from '@/service/apiInstance';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';

type ChartData = {
  growth: { percentage: number; trend: false };
  interestLevel: { percentage: number; trend: false };
  investmentIndex: { percentage: number; trend: false };
  profitability: { percentage: number; trend: false };
  stockPrice: { percentage: number; trend: false };
};

type ChartBaseItem = { percentage: string; trend: false };

export function useGetChartData(stockId: UUID) {
  const { getChartData } = businessAPI;
  const [chartData, setChartData] = useState<ChartData>({
    growth: { percentage: 0, trend: false },
    interestLevel: { percentage: 0, trend: false },
    investmentIndex: { percentage: 0, trend: false },
    profitability: { percentage: 0, trend: false },
    stockPrice: { percentage: 0, trend: false },
  });
  useEffect(() => {
    if (stockId) {
      getChartData({ stockId }).then((res) => {
        if (res?.analysisResult) {
          const processedData: Partial<ChartData> = {};
          for (const [key, value] of Object.entries(
            res.analysisResult,
          )) {
            processedData[key as keyof ChartData] = {
              percentage: Number((value as ChartBaseItem).percentage),
              trend: (value as ChartBaseItem).trend || false,
            };
          }

          setChartData({
            growth: processedData.growth || {
              percentage: 0,
              trend: false,
            },
            interestLevel: processedData.interestLevel || {
              percentage: 0,
              trend: false,
            },
            investmentIndex: processedData.investmentIndex || {
              percentage: 0,
              trend: false,
            },
            profitability: processedData.profitability || {
              percentage: 0,
              trend: false,
            },
            stockPrice: processedData.stockPrice || {
              percentage: 0,
              trend: false,
            },
          });
        }
      });
    }
  }, [stockId]);

  return chartData;
}
