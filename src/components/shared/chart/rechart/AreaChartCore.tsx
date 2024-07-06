import { dynamicImport } from '@/utils/rechart/dynamicRecharts';
import { Area, XAxis, YAxis, Tooltip } from 'recharts';

const DynamicAreaChart = dynamicImport('AreaChart');

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

/**
 *
 * @description
 *  - 성장도, 영향도: AI 개발팀으로 개발 담당 변경 (2024/06/19 - 테디)
 */
export default function AreaChartCore() {
  return (
    <DynamicAreaChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="30%" stopColor="#00ACF2" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#00ACF2" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" axisLine={false} tickLine={false} />
      <YAxis orientation="right" axisLine={false} tickLine={false} />
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
