'use client';

import { Stock } from '@/types/stock';
import Chart from '../shared/chart';
import Link from 'next/link';

export default function ReportWrapper({
  stocks,
  isEn = false,
}: {
  stocks: Array<Stock>;
  isEn?: boolean;
}) {
  const width = isEn ? 'min-w-[387px]' : 'w-[387px]';
  return (
    <ul className="flex w-full gap-5 overflow-scroll scrollbar-hide pb-4">
      {stocks.map(
        (stock, i) =>
          i < 3 && (
            <li key={stock.stock_id}>
              <Link href={`/stock/${stock.stock_id}`}>
                <Chart width={width}>
                  <Chart.SpecificStockAIReport
                    stock={stock}
                    type="home"
                    isEn={isEn}
                  />
                </Chart>
              </Link>
            </li>
          ),
      )}
    </ul>
  );
}
