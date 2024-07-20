import { PolarAngleAxis } from 'recharts';
import StockAIReportChart from './StockAIReportChart';
import CustomTick from './rechart/CustomTick';
import Rechart from './rechart';
import { useTranslations } from 'next-intl';

const radarStatus = {
  width: 189.43,
  height: 176,
  cx: 80,
  cy: 93,
  outerRadius: 84,
  polarRadius: [25, 40, 55, 70, 85],
  numberOfSides: 5,
};

/**
 * 프롬프트 작업 대기, 임시 완성
 */
export default function StockAIReportCard({
  as,
}: {
  as?: React.ElementType;
}) {
  const score = 70;
  const t = useTranslations();
  const radarData = [
    {
      subject: t('RadarChart.stock_price'),
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: t('RadarChart.investment_index'),
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: t('RadarChart.interest_level'),
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: t('RadarChart.growth'),
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: t('RadarChart.profitability'),
      A: 85,
      B: 90,
      fullMark: 150,
    },
  ];

  return (
    <Rechart className={'min-w-[365.44px] pb-8'}>
      <div className="flex justify-between pr-[8.439px] mb-[17px]">
        <Rechart.Label
          as={as}
          className="b1 font-semibold text-primary-900"
        >
          {t('Stock.radar_chart')}
        </Rechart.Label>
        <Rechart.RadarScore className="h3 font-medium text-grayscale-700">
          {t('Stock.points', { score })}
        </Rechart.RadarScore>
      </div>
      <StockAIReportChart
        radarData={radarData}
        radarStatus={radarStatus}
      >
        <PolarAngleAxis
          dataKey="subject"
          tick={(props) => <CustomTick {...props} />}
        />
      </StockAIReportChart>
    </Rechart>
  );
}
