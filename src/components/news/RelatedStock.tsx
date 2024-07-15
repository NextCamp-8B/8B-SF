import React from 'react';
import StockListItem from '../shared/StockListItem';
import { Stock } from '@/types/stock';
import { businessAPI } from '@/service/apiInstance';

type RelatedStockProps = {
  id: string;
};

export default async function RelatedStock({
  id,
}: RelatedStockProps) {
  const { stockList }: { stockList: Stock[] } =
    await businessAPI.getRelatedStock({ newsId: id });
  return (
    <div>
      {stockList.map((stock) => (
        <StockListItem stock={stock} key={stock.stock_id} />
      ))}
    </div>
  );
}
