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
  tmpNews,
  tmpStocks,
  searchText,
}: {
  tmpNews: News[] | null;
  tmpStocks: Stock[] | null;
  searchText: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // 검색어가 들어가는 주식 종목 필터링
  const filteredStocks =
    tmpStocks &&
    tmpStocks.filter(
      (stock: Stock) =>
        stock.stock_name.includes(searchText) ||
        stock.stock_code.includes(searchText),
    );
  // 필터링된 주식 종목 이름 배열
  const stockNames =
    filteredStocks && filteredStocks.map((stock) => stock.stock_name);

  // 주식 종목중, 검색어와 일치하는 종목의 이름이 뉴스에 들어가는 것을 필터링

  const filteredNews =
    tmpNews &&
    tmpNews.filter(
      (news: News) =>
        stockNames &&
        stockNames.some(
          (stockName) =>
            // 현재는 한국어 ko, en, fr, ja, zh 로 변경
            news.title_ko.includes(stockName) ||
            news.content_ko.includes(stockName),
        ),
    );

  // 현재 표시되는 뉴스 항목 슬라이싱
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleNews = filteredNews?.slice(0, visibleCount);

  const loadMoreHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 4);
      setIsLoading(false);
    }, 500);
    // 정보를 더 불러오는 동안 0.5초간 로딩(클릭시 바로 나오는 뉴스 클릭 방지)
  };
  return (
    <>
      <div className="flex items-center">
        <SearchHeading> 뉴스 </SearchHeading>
        <span className="text-sm font-medium text-grayscale-600 underline">
          {filteredNews && `(${filteredNews.length})`}
        </span>
      </div>

      {isLoading ? (
        <Loading />
      ) : filteredNews && filteredNews.length > 0 ? (
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
              isVisible={visibleCount < filteredNews.length}
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
