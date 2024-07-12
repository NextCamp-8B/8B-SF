'use client';

import { useEffect, useState } from 'react';
import NoData from './NoData';
import RecentItem from './RecentItem';
import { Stock } from '@/types/stock';
import { stocksProps } from '../search/InputItem';

export default function Recent({ session }: { session: any }) {
  const [recentDatas, setRecentDatas] = useState<
    stocksProps[] | null
  >([]);

  useEffect(() => {
    const fetchRecentSearch = async () => {
      if (session) {
        const response = await fetch(
          `/api/search/recent?userId=${session?.user.id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setRecentDatas(data.stocks);
        }
      }
    };
    fetchRecentSearch();
  }, [session]);

  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">최근 조회</div>
        <div className="flex flex-col justify-center items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          {recentDatas ? (
            <RecentItem stocks={recentDatas} />
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
