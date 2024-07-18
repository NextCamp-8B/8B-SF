import StockListItem from '@/components/shared/StockListItem';
import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';
import { useEffect, useState } from 'react';

export default function Popular() {
  const [popularTypes, setPopularTypes] = useState<Array<Stock>>([]);
  const { getPopularStock } = businessAPI;

  useEffect(() => {
    getPopularStock().then((res) => setPopularTypes(res.stocks));
  }, []);

  const tmpInfo = {
    logo_path:
      'https://zlxqxgiycccjxcwzonsx.supabase.co/storage/v1/object/public/8b-sf/stock_logo/apple_logo.svg',
    fluctuations_ratio: 0.6,
    price: 15,
    compare_to_previous_close_price: 20,
  };

  const tmpStockData = popularTypes.map((stockInfo) => ({
    ...stockInfo,
    ...tmpInfo,
  }));

  if (tmpStockData.length === 0) return null;

  return (
    <>
      {tmpStockData.map((stock) => (
        <StockListItem
          key={stock.stock_id}
          stock={stock}
          type="find"
        />
      ))}
    </>
  );
}
