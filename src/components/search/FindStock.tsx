'use client';

import { useEffect, useState } from 'react';
import FindStockItem from './FindStockItem';
import FindNews from '../search/FindNews';
import { TMP_NEWS_LIST } from '@/constants';
import { Stock } from '@/types/stock';
import { News } from '@/types/news';

export default function FindStock({
  searchText,
}: {
  searchText: string;
}) {
  const [stocksList, setStocksList] = useState<Stock[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch('/api/search/stock', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setStocksList(data.stocks);
        // console.log(stocksList);
      }
    };

    const fetchNews = async () => {
      const response = await fetch('/api/search/news');
      if (response.ok) {
        const data = await response.json();
        setNewsList(data.news);
        // console.log(newsList);
      }
    };

    fetchStocks();
    fetchNews();
  }, [searchText]);

  return (
    <div className="py-4">
      <div className="w-[590px]">
        {stocksList && (
          <FindStockItem
            stockList={stocksList}
            searchText={searchText}
          />
        )}
      </div>
      <div className="py-4">
        <FindNews
          // newList={newsList}
          tmpNews={TMP_NEWS_LIST}
          stockList={stocksList} //
          searchText={searchText}
        />
      </div>
    </div>
  );
}
