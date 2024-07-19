'use client';

import { Stock } from '@/types/stock';
import Chart from '../shared/chart';

export default function ReportWrapper({
  stocks,
}: {
  stocks: Array<Stock>;
}) {
  return (
    <ul className="flex justify-between w-full">
      {stocks.map(
        (stock, i) =>
          i < 3 && (
            <li key={stock.stock_id}>
              <Chart width="w-[387px]">
                <Chart.SpecificStockAIReport
                  stock={stock}
                  type="home"
                />
              </Chart>
            </li>
          ),
      )}
    </ul>
  );
}
