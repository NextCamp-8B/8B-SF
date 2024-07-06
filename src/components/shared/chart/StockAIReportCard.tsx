import { PolarAngleAxis } from 'recharts';
import StockAIReportChart from './StockAIReportChart';
import CustomTick from './rechart/CustomTick';
import Rechart from './rechart';

const radarStatus = {
  width: 189.43,
  height: 176,
  cx: 88,
  cy: 93,
  outerRadius: 93,
  polarRadius: [35, 50, 65, 80, 95],
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
export default function StockAIReportCard() {
  const score = 70;

  return (
    <Rechart className={'min-w-[365.44px] pb-8'}>
      <div className="flex justify-between pr-[8.439px] mb-[17px]">
        <Rechart.RadarLabel className="b1 font-semibold text-primary-900">
          종목 AI 리포트
        </Rechart.RadarLabel>
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
