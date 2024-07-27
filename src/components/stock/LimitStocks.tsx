import React from 'react';
import StockListItem from '../shared/StockListItem';
import { Stock } from '@/types/stock';
import SkeletonStockListItem from '../skeleton/stock/SkeletonStockListItem';

type LimitStocksProps = {
  type: 'increase' | 'decrease';
};

export default async function LimitStocks({
  type,
}: LimitStocksProps) {
  const { stockList }: { stockList: Stock[] } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/stock/${type}`)
  ).json();
  // console.log(stockList);
  return (
    <div className="flex flex-col  bg-[#FFFFFF] rounded-2xl mt-6 px-8 py-6 min-h-[368px]">
      {stockList.map((stock) => (
        <div
          key={stock.stock_id}
          className="min-w-[494px] flex flex-col hover:bg-primary-50 hover:rounded-lg hover:scale-105 duration-500 px-4"
        >
          <StockListItem stock={stock} />
        </div>
      ))}
    </div>
  );
}
