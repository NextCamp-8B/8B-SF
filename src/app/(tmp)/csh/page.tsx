'use client';

import Chart from '@/components/shared/chart';

export default function CSH() {
  return (
    <>
      <Chart>
        <Chart.StockAIReportCard />
      </Chart>
      <Chart>
        <Chart.SpecificStockAIReport />
      </Chart>
    </>
  );
}
