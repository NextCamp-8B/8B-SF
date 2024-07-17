'use client';

import { useEffect, useState } from 'react';
import StockListItem from '../shared/StockListItem';
import Wrapper from '../shared/Wrapper';
import NotFind from './NotFind';
import MoreData from './MoreData';
import SearchHeading from './SearchHeading';
import { Stock } from '@/types/stock';
import { businessAPI } from '@/service/apiInstance';
import { UUID } from 'crypto';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';

export default function FindStockItem({
  stockList,
  searchText,
  session,
}: {
  stockList: Stock[];
  searchText: string;
  session: Session | null;
}) {
  const [visibleCount, setVisibleCount] = useState(6);
  const userId = session?.user.id as UUID;
  const t = useTranslations('Search');
  // 검색어 변경 시, 목록 초기화(6개)
  useEffect(() => {
    setVisibleCount(6);
  }, [searchText]);

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

  const { updateRecentSearch } = businessAPI;

  return (
    <>
      <div className="flex items-center">
        <SearchHeading> {t('stock')} </SearchHeading>
        <span className="text-sm font-medium text-grayscale-600 underline">
          {`(${stockList.length})`}
        </span>
      </div>
      {stockList.length > 0 ? (
        <Wrapper width="590px" padding="p-6">
          <ul className="w-[542px] flex flex-wrap justify-between">
            {stockList.map(
              (stock: Stock, index: number) =>
                index < 4 && (
                  <li
                    className="w-[263px]"
                    key={stock.stock_id}
                    onClick={() => {
                      viewUpdate(stock.stock_id);
                      updateRecentSearch({
                        stockId: stock.stock_id as UUID,
                        userId,
                      });
                    }}
                  >
                    <StockListItem stock={stock} type="find" />
                  </li>
                ),
            )}
          </ul>
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
