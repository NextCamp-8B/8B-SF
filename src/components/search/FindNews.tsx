'use client';

import Wrapper from '../shared/Wrapper';
import SearchHeading from './SearchHeading';
import NewsItem from './NewsItem';
import MoreData from './MoreData';
import NotFind from './NotFind';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { Stock } from '@/types/stock';
import { News } from '@/types/news';
import SkeletonNewsListItem from '../skeleton/news/SkeletonNewsListItem';

export default function FindNews({
  newsList,
}: {
  newsList: News[] | null;
  searchText: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  // 현재 표시되는 뉴스 항목 슬라이싱
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleNews = newsList?.slice(0, visibleCount);

  const loadMoreHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 6);
      setIsLoading(false);
    }, 200);
  };
  useEffect(() => {
    setVisibleCount(6);
  }, [newsList]);

  useEffect(() => {
    if (newsList && newsList.length > 0) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 300); // 0.3초 후에 스켈레톤 숨기기
      return () => clearTimeout(timer);
    }
  }, [newsList]);

  return (
    <>
      <div className="flex items-center">
        <SearchHeading> 뉴스 </SearchHeading>
        <span className="text-sm font-medium text-grayscale-600 underline">
          {newsList && `(${newsList.length})`}
        </span>
      </div>

      {newsList && newsList.length > 0 ? (
        <Wrapper width="590px" padding="p-6">
          <div className="w-[542px] flex flex-col justify-center gap-4">
            {showSkeleton
              ? visibleNews &&
                visibleNews.map((_, idx) => (
                  <SkeletonNewsListItem key={idx} type="medium" />
                ))
              : visibleNews &&
                visibleNews.map((news, idx) => (
                  <NewsItem news={news} key={idx} />
                ))}
            {isLoading &&
              visibleNews &&
              visibleNews.map((_, idx) => (
                <SkeletonNewsListItem key={idx} type="medium" />
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
