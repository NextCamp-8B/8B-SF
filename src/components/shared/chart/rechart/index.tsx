import AreaChart from './AreaChartCore';
import RechartMain from './RechartMain';
import StockAIReportCore from './StockAIReportCore';
import ChartLabel from './ChartLabel';
import RadarMetricsBox from './RadarMetricsBox';
import RadarScore from './RadarScore';
import RadarMetrics from './RadarMetrics';
import RadarBtnWrapper from './RadarBtnWrapper';
import MetricsLabel from './MetricsLabel';
import MetricsPercent from './MetricsPercent';
import AreaBtnWrapper from './AreaBtnWrapper';

export const Rechart = Object.assign(RechartMain, {
  Area: AreaChart,
  Radar: StockAIReportCore,
  Label: ChartLabel,
  RadarMetricsBox,
  RadarScore,
  RadarMetrics,
  RadarBtnWrapper,
  MetricsLabel,
  MetricsPercent,
  AreaBtnWrapper,
});
export default Rechart;
