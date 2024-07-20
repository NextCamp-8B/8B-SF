import { useTranslations } from 'next-intl';
import Rechart from './rechart';
import { RadarData, RadarStatus } from './types';

export default function StockAIReportChart({
  children,
  radarData,
  radarStatus,
  specific,
}: {
  children?: React.ReactElement;
  radarData: RadarData;
  radarStatus: RadarStatus;
  specific?: boolean;
}) {
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
          percent={55.2}
          rate={true}
        />
        <MetricsBar
          label={'investment_index'}
          percent={0.0}
          rate={true}
        />
        <MetricsBar
          label={'profitability'}
          percent={'55.2'}
          rate={false}
        />
        <MetricsBar label={'growth'} percent={55.2} rate={false} />
        <MetricsBar
          label={'interest_level'}
          percent={55.2}
          rate={true}
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
  // 임시
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
