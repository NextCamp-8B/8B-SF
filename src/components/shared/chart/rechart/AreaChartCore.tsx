import { dynamicImport } from '@/utils/rechart/dynamicRecharts';
import { Area, XAxis, YAxis, Tooltip } from 'recharts';
import { AreaChartData, CustomizedXAxisTickProps } from '../types';

const DynamicAreaChart = dynamicImport('AreaChart');
function formatDateTime(
  dateTimeStr: string,
  periodType: 'day' | 'month' | 'year',
): string {
  const year = dateTimeStr.substring(0, 4);
  const month = dateTimeStr.substring(4, 6);
  const day = dateTimeStr.substring(6, 8);
  const hour = dateTimeStr.substring(8, 10);
  const minute = dateTimeStr.substring(10, 12);

  const formatMapping: { [key: string]: string } = {
    day: `${hour}:${minute}`,
    month: `${month}/${day}`,
    year: `${year}/${month}`,
  };

  const formattedDateTime = formatMapping[periodType];

  if (!formattedDateTime) {
    throw new Error(`Unknown period type: ${periodType}`);
  }

  return formattedDateTime;
}

const renderCustomizedXAxisTick = (
  props: CustomizedXAxisTickProps,
) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x}, ${y})`}>
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

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  console.log(active, payload);
  if (active && payload && payload.length) {
    const { localDate } = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p className="label">{localDate}</p>
      </div>
    );
  }

  return null;
};

/**
 *
 * @description
 *  - 성장도, 영향도: AI 개발팀으로 개발 담당 변경 (2024/06/19 - 테디)
 */
export default function AreaChartCore({
  data,
}: {
  data: AreaChartData;
}) {
  const stockData = data?.processed;
  const periodType = data?.periodType as 'day' | 'month' | 'year';
  const lastDataName = stockData[stockData.length - 1]?.localDate;
  const xAxisDataPoints = 4;
  const xAxisInterval = Math.round(
    stockData.length / xAxisDataPoints,
  );
  const formatted =
    periodType &&
    stockData &&
    stockData.map((item) => ({
      ...item,
      localDate: formatDateTime(item.localDate, periodType),
    }));

  return (
    <DynamicAreaChart
      width={617}
      height={152}
      data={formatted}
      margin={{
        top: 5,
        right: 11,
        left: -25,
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
        interval={xAxisInterval}
        dataKey="localDate"
        axisLine={false}
        tickLine={false}
        tick={renderCustomizedXAxisTick}
      />
      <YAxis
        domain={['dataMin', 'dataMax']}
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
      <Tooltip
      // content={<CusomTooltip />}
      />
      <Area
        type="monotone"
        dataKey="avgPrice"
        stroke="#00ACF2"
        fill="url(#colorUv)"
      />
    </DynamicAreaChart>
  );
}
