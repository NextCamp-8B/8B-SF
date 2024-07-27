import { useId } from 'react';
import { Radar, RadarChart } from 'recharts';
import { calculateRadii } from '@/utils/calculateRadii';
import { generatePaths } from '@/utils/rechart/generatePaths';
import {
  PolarGridParam,
  PolarGridPath,
  RadarData,
  RadarStatus,
} from '../types';

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
 * 
 * @example
   // SpecificStockAIReport 구현 <미정>
   <Reachart>
    // ...
   </Reachart>

   // StockAIReportChart 구현
   <Rechart className={''}>
      <div className="">
        <Rechart.Radar radarStatus={radarStatus} data={radarData}>
          // PolarAngleAxis subject 표시 - children 사용
          <PolarAngleAxis
            dataKey="subject"
            tick={(props) => <CustomTick {...props} />}
          />
        </Rechart.Radar>
        <Rechart.RadarMetricsBox className="w-[176px] bg-grayscale-100 border border-grayscale-0 rounded-3xl">
          <Rechart.RadarMetrics>주가 0.0%</Rechart.RadarMetrics>
        </Rechart.RadarMetricsBox>
      </div>
    </Rechart>
 */
export default function StockAIReportCore({
  children,
  radarStatus,
  data,
}: {
  children?: React.ReactElement;
  radarStatus: RadarStatus;
  data: RadarData;
}) {
  const {
    width,
    height,
    cx,
    cy,
    outerRadius,
    polarRadius,
    numberOfSides,
  } = radarStatus;
  const chartId = useId();

  return (
    <RadarChart
      id={chartId}
      cx={cx}
      cy={cy}
      outerRadius={calculateRadii(outerRadius as number)}
      width={width}
      height={height}
      data={data}
    >
      {customPolarGrid({
        cx: cx as number,
        cy: cy as number,
        polarRadius: polarRadius as Array<number>,
        numberOfSides: numberOfSides as number,
      })}
      {children}
      <Radar
        name="StockAIReport"
        isAnimationActive={false}
        dataKey="score"
        stroke="#00ACF2"
        fill="#B2E6FA"
        fillOpacity={0.3}
      />
    </RadarChart>
  );
}
