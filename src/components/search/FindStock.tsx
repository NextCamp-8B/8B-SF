'use client';

import { useEffect, useState } from 'react';
import FindStockItem from './FindStockItem';
import FindNews from '../search/FindNews';
import { Stock } from '@/types/stock';
import { News } from '@/types/news';
import { Session } from 'next-auth';

export default function FindStock({
  searchText,
  session,
}: {
  searchText: string;
  session: Session | null;
}) {
  const [stocksList, setStocksList] = useState<Stock[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch(
        `/api/search/stock?searchText=${searchText}`,
      );

      if (response.ok) {
        const data = await response.json();
        setStocksList(data);
      }
    };
    const debounceTimeout: number = window.setTimeout(() => {
      fetchStocks();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  useEffect(() => {
    const fetchNews = async () => {
      if (stocksList.length > 0) {
        const stockIds = stocksList
          .map((stock) => stock.stock_id)
          .join('&stockId=');

        const response = await fetch(
          `/api/search/news?stockId=${stockIds}`,
        );
        if (response.ok) {
          const data = await response.json();
          setNewsList(data);
          // console.log(stockIds);
        }
      }
    };

    const debounceTimeout: number = window.setTimeout(() => {
      fetchNews();
    }, 200);

    return () => clearTimeout(debounceTimeout);
  }, [stocksList]);

  return (
    <div className="py-4">
      <div className="w-[590px]">
        {stocksList && (
          <FindStockItem
            stockList={stocksList}
            searchText={searchText}
            session={session}
          />
        )}
      </div>
      <div className="py-4">
        <FindNews newsList={newsList} searchText={searchText} />
      </div>
    </div>
  );
}
