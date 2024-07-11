'use client';

import { useEffect, useState } from 'react';
import StockListItem from '../shared/StockListItem';
import Wrapper from '../shared/Wrapper';
import AI from '@/assets/icons/ai.svg';
import NotFind from './NotFind';
import MoreData from './MoreData';
import Link from 'next/link';
import SearchHeading from './SearchHeading';
import { Stock } from '@/types/stock';

export default function FindStockItem({
  stockList,
  searchText,
  session,
}: {
  stockList: Stock[];
  searchText: string;
  session: any;
}) {
  const [visibleCount, setVisibleCount] = useState(6);

  // 검색어 변경 시, 목록 초기화(6개)
  useEffect(() => {
    setVisibleCount(6);
  }, [searchText]);

  // 현재 표시되는 항목중 홀수, 짝수번째 슬라이싱
  const visibleEvenStocks = stockList
    .filter((_, index) => index % 2 === 0)
    .slice(0, visibleCount / 2);
  const visibleOddStocks = stockList
    .filter((_, index) => index % 2 !== 0)
    .slice(0, visibleCount / 2);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const viewUpdate = async (stock_id: string) => {
    const response = await fetch('/api/search/popular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock_id }),
    });
  };

  const recentUpdate = async (stock_id: string) => {
    const response = await fetch('/api/search/recent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock_id, session }),
    });
  };

  return (
    <>
      <div className="flex items-center">
        <SearchHeading> 주식 </SearchHeading>
        <span className="text-sm font-medium text-grayscale-600 underline">
          {`(${stockList.length})`}
        </span>
      </div>
      {stockList.length > 0 ? (
        <Wrapper width="590px" padding="p-6">
          <div className="w-[542px] flex justify-center gap-4">
            <div className="w-[263px] flex justify-start flex-col">
              {visibleEvenStocks.map((stock: Stock) => (
                <div
                  key={stock.stock_id}
                  onClick={() => {
                    viewUpdate(stock.stock_id),
                      recentUpdate(stock.stock_id);
                  }}
                >
                  <StockListItem stock={stock} type="find" />
                </div>
              ))}
            </div>
            <div className="w-[263px] flex justify-start flex-col">
              {visibleOddStocks.map((stock: Stock) => (
                <div
                  key={stock.stock_id}
                  onClick={() => {
                    viewUpdate(stock.stock_id),
                      recentUpdate(stock.stock_id);
                  }}
                >
                  <StockListItem stock={stock} type="find" />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3">
            <MoreData
              onClick={handleLoadMore}
              isVisible={visibleCount < stockList.length}
            />
          </div>
        </Wrapper>
      ) : (
        <Wrapper width="590px" padding="p-6">
          <NotFind type="stock" />
        </Wrapper>
      )}
    </>
  );
}
