import { useTranslations } from 'next-intl';
import Rechart from './rechart';
import { RadarData, RadarStatus } from './types';

export default function StockAIReportChart({
  children,
  radarData,
  radarStatus,
  specific,
  chartData = {
    growth: { score: 0, trend: false },
    interestLevel: { score: 0, trend: false },
    investmentIndex: { score: 0, trend: false },
    profitability: { score: 0, trend: false },
    stockPrice: { score: 0, trend: false },
  },
}: {
  children?: React.ReactElement;
  radarData: RadarData;
  radarStatus: RadarStatus;
  specific?: boolean;
  chartData: {
    growth: { score: number; trend: boolean };
    interestLevel: { score: number; trend: boolean };
    investmentIndex: { score: number; trend: boolean };
    profitability: { score: number; trend: boolean };
    stockPrice: { score: number; trend: boolean };
  };
}) {
  const {
    stockPrice,
    investmentIndex,
    profitability,
    growth,
    interestLevel,
  } = chartData;

  return (
    <div className={`flex justify-between w-full`}>
      <Rechart.Radar radarStatus={radarStatus} data={radarData}>
        {children}
      </Rechart.Radar>
      <Rechart.RadarMetricsBox
        className={`min-w-[176px] flex flex-col gap-[4px] justify-between ${
          specific ? 'px-6' : 'px-7'
        } pt-4 pb-6 
        bg-grayscale-100 border border-grayscale-0 rounded-3xl`}
      >
        <MetricsBar
          label={'stock_price'}
          percent={stockPrice.score}
          rate={stockPrice.trend}
        />
        <MetricsBar
          label={'investment_index'}
          percent={investmentIndex.score}
          rate={investmentIndex.trend}
        />
        <MetricsBar
          label={'profitability'}
          percent={profitability.score}
          rate={profitability.trend}
        />
        <MetricsBar
          label={'growth'}
          percent={growth.score}
          rate={growth.trend}
        />
        <MetricsBar
          label={'interest_level'}
          percent={interestLevel.score}
          rate={interestLevel.trend}
        />
      </Rechart.RadarMetricsBox>
    </div>
  );
}

function MetricsBar({
  label,
  percent,
  rate,
}: {
  label: string;
  percent: string | number;
  rate: boolean;
}) {
  const t = useTranslations();

  return (
    <Rechart.RadarMetrics className="flex justify-between min-w-[120px]">
      <Rechart.MetricsLabel className="b4 font-medium text-grayscale-600">
        {t(`RadarChart.${label}`)}
      </Rechart.MetricsLabel>
      <Rechart.MetricsPercent rate={rate}>
        {percent}
      </Rechart.MetricsPercent>
    </Rechart.RadarMetrics>
  );
}
