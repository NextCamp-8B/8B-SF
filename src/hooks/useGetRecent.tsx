import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';

export function useGetRecent({ userId }: { userId: UUID }) {
  const [recentStocks, setRecentStocks] = useState<Array<Stock>>([]);

  const { getRecentSearch } = businessAPI;
  useEffect(() => {
    if (userId) {
      getRecentSearch({ userId }).then((res) => {
        setRecentStocks(res.stocks);
      });
    }
  }, [userId, getRecentSearch]);

  return { recentStocks };
}
