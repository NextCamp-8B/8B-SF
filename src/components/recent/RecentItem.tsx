'use client';

import StockListItem from '@/components/shared/StockListItem';
import { Stock } from '@/types/stock';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NoData from './NoData';
import { businessAPI } from '@/service/apiInstance';
import { UUID } from 'crypto';

export default function RecentItem() {
  const [recentDatas, setRecentDatas] = useState<Stock[]>([]);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const { getRecentHome } = businessAPI;

  useEffect(() => {
    const fetchRecentSearch = async (userId: UUID) => {
      if (isAuthenticated) {
        const response = await getRecentHome({ userId });
        const { stocks } = response;

        if (stocks) {
          setRecentDatas(stocks);
        }
      }
    };

    if (isAuthenticated) {
      fetchRecentSearch(session.user.id as UUID);
    }
  }, [session, isAuthenticated, getRecentHome]);

  return (
    <>
      {recentDatas?.length > 0 ? (
        recentDatas.map((stock, i) => (
          <div
            className="min-w-[494px] flex flex-col hover:bg-primary-50 hover:rounded-lg hover:scale-105 duration-500 px-4"
            key={i}
          >
            <StockListItem stock={stock} />
          </div>
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}
