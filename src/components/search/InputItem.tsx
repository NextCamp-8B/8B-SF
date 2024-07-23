'use client';

import { useCallback, useEffect, useState } from 'react';
import FindStock from './FindStock';
import RecentSearch from './RecentSearch';
import PopularSearch from './PopularSearch';
import NoSearchData from './NoSearchData';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Search from '@/assets/icons/search.svg';

export type stocksProps = {
  stock_id?: string;
  stock_name?: string;
  stock_code?: string;
  created_at?: string;
};

export default function InputItem() {
  const [text, setText] = useState('');
  const [recentDatas, setRecentDatas] = useState<
    stocksProps[] | null
  >([]);
  const [isFocused, setIsFocused] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const t = useTranslations('Search');

  const fetchRecentSearch = useCallback(async () => {
    if (isAuthenticated) {
      const response = await fetch(
        `/api/search/recent?userId=${session?.user?.id || ''}`,
      );
      if (response.ok) {
        const data = await response.json();
        setRecentDatas(data.stocks);
      }
    }
  }, [session, isAuthenticated]);

  useEffect(() => {
    fetchRecentSearch();
  }, [fetchRecentSearch]);

  return (
    <div>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={t('placeholder_search')}
          className="w-[590px] h-14 rounded-lg py-4 px-11 border-2 border-grayscale-300 bg-grayscale-0 focus:scale-105 "
          onChange={(e) => {
            setText(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search
          className={`w-8 absolute ${isFocused ? 'mx-1' : 'mx-2'}`}
        />
      </div>

      {text.trim().length > 0 ? (
        <FindStock searchText={text} session={session} />
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
