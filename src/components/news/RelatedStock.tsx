import React from 'react';
import StockListItem, { Stock } from '../shared/StockListItem';
import AI from '@/assets/icons/ai.svg';

type RelatedStockProps = {
  stockList: Stock[];
};

export default function RelatedStock({
  stockList,
}: RelatedStockProps) {
  return (
    <div>
      {stockList.map((stock) => (
        <StockListItem
          stock={stock}
          key={stock.id}
          icon={<AI className="w-12 h-12 text-grayscale-0" />}
        />
      ))}
    </div>
  );
}
