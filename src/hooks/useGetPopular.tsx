import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';
import { useEffect, useState } from 'react';

export function useGetPopular() {
  const [popularStocks, setPopularStocks] = useState<Array<Stock>>(
    [],
  );
  const { getPopularStock } = businessAPI;
  useEffect(() => {
    getPopularStock().then((res) => setPopularStocks(res.stocks));
  }, [getPopularStock]);

  return { popularStocks };
}
