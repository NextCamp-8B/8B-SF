'use client';

import StockPriceCore from './StockPriceCore';
import RechartMain from './RechartMain';
import StockAIReportCore from './StockAIReportCore';

export const Rechart = Object.assign(RechartMain, {
  Area: StockPriceCore,
  Radar: StockAIReportCore,
});
export default Rechart;
