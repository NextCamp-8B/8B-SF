'use client';
import { useCallback, useEffect, useState } from 'react';
import FindStock from './FindStock';
import RecentSearch from './RecentSearch';
import PopularSearch from './PopularSearch';
import NoSearchData from './NoSearchData';
import { useSession } from 'next-auth/react';

export type stocksProps = {
  stock_id?: string;
  stock_name?: string;
  stock_code?: string;
  created_at?: string;
};

export default function InputItem({}: {}) {
  const { data: session, status } = useSession();
  const [text, setText] = useState('');
  const [recentDatas, setRecentDatas] = useState<
    stocksProps[] | null
  >([]);

  const fetchRecentSearch = useCallback(async () => {
    if (session) {
      const response = await fetch(
        `/api/search/recent?userId=${session?.user.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setRecentDatas(data.stocks);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchRecentSearch();
  }, [fetchRecentSearch]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="종목을 검색해주세요"
        className="w-[590px] h-14 rounded-lg py-4 px-11 border-2 border-grayscale-300 bg-grayscale-0 focus:scale-105"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      {text.trim().length > 0 ? (
        <FindStock searchText={text} />
      ) : (
        <>
          <div className="py-4">
            {recentDatas && recentDatas.length > 0 ? (
              <RecentSearch
                recentDatas={recentDatas}
                session={session}
                setRecentDatas={setRecentDatas}
              />
            ) : (
              <NoSearchData />
            )}
          </div>
          <div className="py-4">
            <PopularSearch session={session} />
          </div>
        </>
      )}
    </div>
  );
}
