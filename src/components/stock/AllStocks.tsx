'use client';

import { Stock } from '@/types/stock';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SkeletonStockListItem from '../skeleton/stock/SkeletonStockListItem';
import dynamic from 'next/dynamic';

const StockListItem = dynamic(
  () => import('@/components/shared/StockListItem'),
  {
    loading: () => <SkeletonStockListItem />,
  },
);

export default function AllStocks() {
  const { ref, inView } = useInView();
  const [stockList, setStockList] = useState<Stock[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoadging] = useState(false);

  const getStockList = async () => {
    if (inView && !loading) {
      setLoadging(true);
      const { stockList, lastPage } = await (
        await fetch(`/api/stock?page=${page}`)
      ).json();
      if (page < lastPage) {
        setStockList((prev) => [...prev, ...stockList]);
        setPage((prev) => prev + 1);
      }
    }

    setTimeout(() => {
      setLoadging(false);
    }, 1000);
  };

  useEffect(() => {
    getStockList();
  }, [inView]);

  return (
    <div className="flex flex-col  bg-[#FFFFFF] rounded-2xl mt-6 px-8 py-6">
      {stockList.map((stock) => (
        <div
          key={stock.stock_id}
          className="min-w-[494px] flex flex-col hover:bg-primary-50 hover:rounded-lg hover:scale-105 duration-500 px-4"
        >
          <StockListItem stock={stock} />
        </div>
      ))}
      <span ref={ref} />
    </div>
  );
}
