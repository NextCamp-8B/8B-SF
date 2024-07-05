import { useId } from 'react';
import { Radar, PolarAngleAxis, RadarChart } from 'recharts';
import { calculateRadii } from '@/utils/calculateRadii';
import { generatePaths } from '@/utils/rechart/generatePaths';
import { PolarGridParam, PolarGridPath } from '../types';

const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
];

/**
 * 주어진 PolarGridParam을 기반으로 극 좌표 그리드를 생성
 *
 * @param props - PolarGridParam 객체로 cx, cy, polarRadius, numberOfSides 속성
 * @returns 생성된 SVG path 요소들을 담은 React JSX 요소
 */
function customPolarGrid<T extends PolarGridParam>(props: T) {
  const paths = generatePaths(props);

  return (
    <g className="recharts-polar-grid">
      {paths.map((pathProps: PolarGridPath) => (
        <path {...pathProps} key={pathProps.key} />
      ))}
    </g>
  );
}

/**
 * 주식 AI 리포트 차트 코어 컴포넌트
 */
export default function StockAIReportCore() {
  const chartId = useId();
  return (
    <RadarChart
      id={chartId}
      cx={300}
      cy={250}
      outerRadius={calculateRadii(120)}
      width={500}
      height={500}
      data={data}
    >
      {customPolarGrid({
        cx: 300,
        cy: 250,
        polarRadius: [35.61, 54.95, 78.35, 99.72, 120], // 10.62
        numberOfSides: 5,
      })}

      <PolarAngleAxis
        dataKey="subject"
        tick={{
          fill: '#575757',
          fontSize: 12,
          letterSpacing: '0%',
          fontWeight: '500',
        }}
      />
      <Radar
        name="Mike"
        isAnimationActive={false}
        dataKey="A"
        stroke="#00ACF2"
        fill="#B2E6FA"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
