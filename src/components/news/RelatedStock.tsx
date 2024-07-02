import React from 'react';
import StockListItem from '../shared/StockListItem';
import AI from '@/assets/icons/ai.svg';
import { Stock } from '@/types/stock';

type RelatedStockProps = {
  id: string;
};

export default async function RelatedStock({
  id,
}: RelatedStockProps) {
  const { stockList }: { stockList: Stock[] } = await (
    await fetch(`http://localhost:3000/api/news/related/stock/${id}`)
  ).json();

  return (
    <div>
      {stockList.map((stock) => (
        <StockListItem stock={stock} key={stock.stock_id} />
      ))}
    </div>
  );
}
