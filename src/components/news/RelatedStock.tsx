import React from 'react';
import StockListItem from '../shared/StockListItem';
import { Stock } from '@/types/stock';
import { businessAPI } from '@/service/apiInstance';
import { getTranslations } from 'next-intl/server';
import Exclamation from '@/assets/icons/exclamation.svg';

type RelatedStockProps = {
  id: string;
};

export default async function RelatedStock({
  id,
}: RelatedStockProps) {
  const t = await getTranslations('NewsDetail');
  const { stockList }: { stockList: Stock[] } =
    await businessAPI.getRelatedStock({ newsId: id });
  return (
    <div>
      {stockList.length > 0 ? (
        stockList.map((stock) => (
          <StockListItem stock={stock} key={stock.stock_id} />
        ))
      ) : (
        <div className="flex flex-col b3 font-bold text-center text-primary-900 pt-5 items-center gap-4">
          <Exclamation />
          {t('stock_warning')}
        </div>
      )}
    </div>
  );
}
