import AreaChart from './AreaChartCore';
import RechartMain from './RechartMain';
import StockAIReportCore from './StockAIReportCore';
import RadarLabel from './RadarLabel';
import RadarMetricsBox from './RadarMetricsBox';
import RadarScore from './RadarScore';
import RadarMetrics from './RadarMetrics';
import RadarBtnWrapper from './RadarBtnWrapper';
import MetricsLabel from './MetricsLabel';
import MetricsPercent from './MetricsPercent';

export const Rechart = Object.assign(RechartMain, {
  Area: AreaChart,
  Radar: StockAIReportCore,
  RadarLabel,
  RadarMetricsBox,
  RadarScore,
  RadarMetrics,
  RadarBtnWrapper,
  MetricsLabel,
  MetricsPercent,
});
export default Rechart;
