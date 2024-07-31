'use client';

import { Stock } from '@/types/stock';
import Chart from '../shared/chart';
import Link from 'next/link';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { businessAPI } from '@/service/apiInstance';
import NotFind from '../search/NotFind';

export default function ReportWrapper({
  userId,
  isEn = false,
}: {
  userId: UUID;
  isEn?: boolean;
}) {
  const width = isEn ? 'min-w-[387px]' : 'w-[387px]';
  const { getInterestStock } = businessAPI;
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  useEffect(() => {
    getInterestStock({
      userId: userId as UUID,
      page: 1,
      size: 4,
      next: { revalidate: 0 },
    }).then((res) =>
      setStocks(res.map(({ stock }: { stock: Stock }) => stock)),
    );
  }, []);

  return (
    <ul className="flex w-full gap-5 overflow-scroll scrollbar-hide pb-4">
      {stocks &&
      typeof stocks?.length === 'number' &&
      stocks?.length > 0 ? (
        stocks.map(
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
        )
      ) : (
        <li className="flex justify-center p-4">
          <NotFind type="stock" />
        </li>
      )}
    </ul>
  );
}
