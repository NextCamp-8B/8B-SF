'use client';

import Wrapper from '../shared/Wrapper';
import SearchHeading from './SearchHeading';
import NewsItem from './NewsItem';
import MoreData from './MoreData';
import NotFind from './NotFind';
import { useState } from 'react';
import Loading from '@/app/loading';
import { Stock } from '@/types/stock';
import { News } from '@/types/news';

export default function FindNews({
  newsList,
}: {
  newsList: News[] | null;
  searchText: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // 현재 표시되는 뉴스 항목 슬라이싱
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleNews = newsList?.slice(0, visibleCount);

  const loadMoreHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 4);
      setIsLoading(false);
    }, 200);
    // 정보를 더 불러오는 동안 0.2초간 로딩(클릭시 바로 나오는 뉴스 클릭 방지)
  };
  return (
    <>
      <div className="flex items-center">
        <SearchHeading> 뉴스 </SearchHeading>
        <span className="text-sm font-medium text-grayscale-600 underline">
          {newsList && `(${newsList.length})`}
        </span>
      </div>

      {isLoading ? (
        <Loading />
      ) : newsList && newsList.length > 0 ? (
        <Wrapper width="590px" padding="p-6">
          <div className="w-[542px] flex flex-col justify-center gap-4">
            {visibleNews &&
              visibleNews.map((news, idx) => (
                <NewsItem news={news} key={idx} />
              ))}
          </div>
          <div className="pt-3">
            <MoreData
              onClick={loadMoreHandler}
              isVisible={visibleCount < newsList.length}
            />
          </div>
        </Wrapper>
      ) : (
        <Wrapper width="590px" padding="p-6">
          <NotFind type="news" />
        </Wrapper>
      )}
    </>
  );
}
