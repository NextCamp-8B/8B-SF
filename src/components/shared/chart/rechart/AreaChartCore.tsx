import { dynamicImport } from '@/utils/rechart/dynamicRecharts';
import { Area, XAxis, YAxis, Tooltip } from 'recharts';
import { CustomizedXAxisTickProps } from '../types';

const DynamicAreaChart = dynamicImport('AreaChart');

const data = [
  {
    name: '2024/04',
    uv: 1000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2024/05',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '2024/06',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '2024/07',
    uv: 9000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '2024/08',
    uv: 4000,
    pv: 9800,
    amt: 2290,
  },
];
const lastDataName = data[data.length - 1].name;
const renderCustomizedXAxisTick = (
  props: CustomizedXAxisTickProps,
  lastDataName: string | number,
) => {
  const { x, y, payload } = props;
  const isSpecificLabel = payload.value === lastDataName;

  return (
    <g
      transform={`translate(${
        x + (isSpecificLabel ? 150 : 0)
      }, ${y})`}
    >
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="middle"
        fill="#9F9F9F"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

/**
 *
 * @description
 *  - 성장도, 영향도: AI 개발팀으로 개발 담당 변경 (2024/06/19 - 테디)
 */
export default function AreaChartCore() {
  return (
    <DynamicAreaChart
      width={617}
      height={152}
      data={data}
      margin={{
        top: 5,
        right: 11,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="30%" stopColor="#00ACF2" stopOpacity={0.7} />
          <stop
            offset="100%"
            stopColor="#00ACF2"
            stopOpacity={0.07}
          />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={(props) =>
          renderCustomizedXAxisTick(props, lastDataName)
        }
      />
      <YAxis
        orientation="right"
        axisLine={false}
        tickLine={false}
        tick={{
          fill: '#9F9F9F',
          fontSize: 14,
          textAnchor: 'middle',
          dx: 30,
        }}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#00ACF2"
        fill="url(#colorUv)"
      />
    </DynamicAreaChart>
  );
}
