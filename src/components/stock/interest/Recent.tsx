import StockListItem from '@/components/shared/StockListItem';
import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';
import { UUID } from 'crypto';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Recent() {
  const [recentTypes, setRecentTypes] = useState<Array<Stock>>([]);
  const { data } = useSession();
  const userId = data?.user.id as UUID;
  const { getRecentSearch } = businessAPI;

  useEffect(() => {
    getRecentSearch({ userId }).then((res) =>
      setRecentTypes(res.stocks),
    );
  }, [userId]);

  const tmpInfo = {
    logo_path:
      'https://zlxqxgiycccjxcwzonsx.supabase.co/storage/v1/object/public/8b-sf/stock_logo/apple_logo.svg',
    fluctuations_ratio: 0.6,
    price: 15,
    compare_to_previous_close_price: 20,
  };

  const tmpStockData = recentTypes.map((stockInfo) => ({
    ...stockInfo,
    ...tmpInfo,
  }));

  if (tmpStockData.length === 0) return null;

  return (
    <ul className="max-w-[714px] flex gap-[20px] overflow-x-auto scrollbar-hide">
      {tmpStockData.map((stock) => (
        <li
          key={stock.stock_id}
          className="border border-primary-100 rounded-lg pr-4 flex items-center justify-center"
        >
          <StockListItem stock={stock} type="default" />
        </li>
      ))}
    </ul>
  );
}
