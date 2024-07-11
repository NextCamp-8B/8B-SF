import { PolarAngleAxis } from 'recharts';
import StockAIReportChart from './StockAIReportChart';
import CustomTick from './rechart/CustomTick';
import Rechart from './rechart';

const radarStatus = {
  width: 189.43,
  height: 176,
  cx: 80,
  cy: 93,
  outerRadius: 84,
  polarRadius: [25, 40, 55, 70, 85],
  numberOfSides: 5,
};

const radarData = [
  {
    subject: '주가',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: '투자지수',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: '관심도',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: '성장성',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: '수익성',
    A: 85,
    B: 90,
    fullMark: 150,
  },
];

/**
 * 프롬프트 작업 대기, 임시 완성
 */
export default function StockAIReportCard({
  as,
}: {
  as?: React.ElementType;
}) {
  const score = 70;

  return (
    <Rechart className={'min-w-[365.44px] pb-8'}>
      <div className="flex justify-between pr-[8.439px] mb-[17px]">
        <Rechart.Label
          as={as}
          className="b1 font-semibold text-primary-900"
        >
          종목 AI 리포트
        </Rechart.Label>
        <Rechart.RadarScore className="h3 font-medium text-grayscale-700">
          {score}점
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
